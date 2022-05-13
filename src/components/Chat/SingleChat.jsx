import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import io from 'socket.io-client';
import axios from 'axios';
import {
    Box, FormControl, IconButton, Input,
    Spinner, Text, toast
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import ScrollableChat from './ScrollableChat';
import AppProfileModal from '../app/AppProfileModal';
import UpdateGroupModal from '../groups/UpdateGroupModal';
import animationData from '../loaders/12966-typing-indicator.json';
import { ChatState } from '../../context/chatProvider';
import {
    getSender, getFullSender, getConfigWithJson, getConfig
} from '../../utils/chatUtils';

const ENDPOINT = 'http://localhost:3000';
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const { user, selectedChat, setSelectedChat, notifications, setNotifications } = ChatState();
    const config = getConfig(user.token);
    const configWithJson = getConfigWithJson(user.token);

    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const [newMessage, setNewMessage] = useState('');

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            setIsLoading(true);
            const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);

            setMessages(data);
            setIsLoading(false);

            socket.emit('join chat', selectedChat._id);
        } catch (error) {
            toast({
                title: 'אין אפשרות לטעון הודעות',
                description: error.response.data.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'bottom',
            });
        };
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },
    };

    const sendMessage = async (e) => {
        if (e.key === 'Enter' && newMessage) {
            socket.emit('stop typing', selectedChat._id);
            const config = configWithJson;
            try {
                setNewMessage('');
                const { data } = await axios.post(`/api/message`, {
                    content: newMessage,
                    chatId: selectedChat._id,
                }, config);

                socket.emit('new message', data);

                setMessages([...messages, data]);
            } catch (error) {
                toast({
                    title: 'שליחת הודעה נכשלה',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'bottom'
                })
            }
        };
    };

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if (!isSocketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit('typing', selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;

            if (timeDiff >= 3000 && typing) {
                socket.emit('stop typing', selectedChat._id);
                setTyping(false);
            }
        }, 3000)
    };

    useEffect(() => {
        fetchMessages();

        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('setup', user);
        socket.on('connected', () => setIsSocketConnected(true));
        socket.on('typing', () => setIsTyping(true))
        socket.on('stop typing', () => setIsTyping(false))
    }, [])

    useEffect(() => {
        socket.on('message recieved', (newMessageRecieved) => {
            if (!selectedChatCompare
                || selectedChatCompare._id !== newMessageRecieved.chat._id)
                 {
                    if(!notifications.includes(newMessageRecieved)){
                        setNotifications([newMessageRecieved, ...notifications]);
                        setFetchAgain(!fetchAgain);
                    }
            } else {
                setMessages([...messages, newMessageRecieved]);
            }
        });
    })

    return (
        <>
            {selectedChat ? (
                <>
                    <Text fontSize={{ base: '28px', md: '30px' }} pb={3}
                        px={2} w='100%' d='flex' alignItems='center'
                        justifyContent={{ base: 'space-between' }}>

                        <IconButton d={{ base: 'flex', md: 'none' }}
                            icon={<ArrowForwardIcon />}
                            onClick={() => setSelectedChat('')} />

                        {selectedChat.isGroupChat
                            ? (
                                <>
                                    {selectedChat.chatName.toUpperCase()}
                                    <UpdateGroupModal fetchAgain={fetchAgain}
                                        setFetchAgain={setFetchAgain}
                                        fetchMessages={fetchMessages} />
                                </>
                            )
                            : (
                                <>
                                    {getSender(user, selectedChat.users)}
                                    <AppProfileModal user={getFullSender(user, selectedChat?.users)} />
                                </>
                            )}
                    </Text>
                    <Box d='flex' flexDir='column' justifyContent='flex-end'
                        p={3} bg='#E8E8E8' w='100%' h='100%'
                        overflowY='hidden' borderRadius='lg'>
                        {isLoading ? (
                            <Spinner size='xl' w={20} h={20} alignSelf='center' margin='auto' />
                        ) : (
                            <div className='messages'>
                                <ScrollableChat messages={messages} />
                            </div>
                        )}
                        <FormControl onKeyDown={sendMessage} required mt={3}>
                            {isTyping && (
                                <div><Lottie width={70}
                                    style={{ marginBottom: 15, marginRight: 0 }}
                                    options={defaultOptions}
                                />
                                </div>
                            )}
                            <Input placeholder='כאן כותבים ...' bg='#E0E0E0'
                                variant='filled' onChange={typingHandler}
                                value={newMessage}
                            />
                        </FormControl>
                    </Box>
                </>
            )
                : (
                    <Box d='flex' justifyContent='center' alignItems='center' h='100%'>
                        <Text fontSize='3xl' pb={3}>
                            עם מי הולכים לצ'וטט?
                        </Text>
                    </Box>
                )}




        </>
    )
};

export default SingleChat;