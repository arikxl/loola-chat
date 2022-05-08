import React, { useState } from 'react';
import { Box, FormControl, IconButton, Input, Spinner, Text } from '@chakra-ui/react';

import { ChatState } from '../../context/chatProvider';
import { getSender, getFullSender } from '../../utils/chatUtils';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import AppProfileModal from '../app/AppProfileModal';
import UpdateGroupModal from '../groups/UpdateGroupModal';
import Loader from '../loaders/Loader';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const { user, selectedChat, setSelectedChat } = ChatState();

    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newMessage, setNewMessage] = useState('');

    const sendMessage = () => {

    };

    const typingHandler = () => {

    };

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
                                        setFetchAgain={setFetchAgain} />
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
                            <div>
                                messages
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