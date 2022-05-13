import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box, FormControl, IconButton, Input,
    Spinner, Text, toast
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';


import ScrollableChat from './ScrollableChat';
import AppProfileModal from '../app/AppProfileModal';
import UpdateGroupModal from '../groups/UpdateGroupModal';
import { ChatState } from '../../context/chatProvider';
import {
    getSender, getFullSender, getConfigWithJson, getConfig
} from '../../utils/chatUtils';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const { user, selectedChat, setSelectedChat } = ChatState();
    const config = getConfig(user.token);
    const configWithJson = getConfigWithJson(user.token);

    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newMessage, setNewMessage] = useState('');

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            setIsLoading(true);
            const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);

            setMessages(data);
            setIsLoading(false);
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

    const sendMessage = async (e) => {
        if (e.key === 'Enter' && newMessage) {
            const config = configWithJson;
            try {
                setNewMessage('');
                const { data } = await axios.post(`/api/message`, {
                    content: newMessage,
                    chatId: selectedChat._id,
                }, config);

                console.log('data:', data)
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

    };

    useEffect(() => {
        fetchMessages();
    }, [selectedChat]);

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
}

export default SingleChat