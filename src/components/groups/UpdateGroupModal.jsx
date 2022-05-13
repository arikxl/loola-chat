import React, { useState } from 'react';
import axios from 'axios';

import { useDisclosure } from '@chakra-ui/hooks';
import {
    Box, Button, IconButton, Modal, ModalBody,
    useToast, ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader, ModalOverlay, Stack, Text, FormControl, Input
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';

import { ChatState } from '../../context/chatProvider';
import UserBadgeItem from '../user/UserBadgeItem';
import { getConfig } from '../../utils/chatUtils';
import Loader from '../loaders/Loader';
import UserItem from '../user/UserItem';


const UpdateGroupModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState('');
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [reNameLoading, setReNameLoading] = useState(false);

    const { selectedChat, setSelectedChat, user } = ChatState();
    const config = getConfig(user.token);

    const handleRemove = async (userToDelete) => {
        try {
            setIsLoading(true);

            const { data } = await axios.put(`/api/chat/groupRemove`, {
                chatId: selectedChat._id, userId: userToDelete._id
            }, config);
            userToDelete._id === user._id ? setSelectedChat(null) : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            fetchMessages();
            setIsLoading(false);
        } catch (error) {
            toast({
                title: 'Error',
                description: error.response.data.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'bottom'
            });
            setIsLoading(false);
        }
    };

    const handleRename = async () => {
        if (!groupChatName) return;
        try {
            setReNameLoading(true);

            const { data } = await axios.put(`/api/chat/renameGroup`, {
                chatId: selectedChat._id, chatName: groupChatName
            }, config);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setReNameLoading(false);
        } catch (error) {
            toast({
                title: 'קרתה שגיאה בשינוי שם הקבוצה',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setReNameLoading(false);
        }
        setGroupChatName('');
    };

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query || query.length < 3 || search === 'com' || search === '.il' || search === 'gmail' || search === '.co') return;

        try {
            setIsLoading(true);
            const { data } = await axios.get(`/api/user?search=${search}`, config);
            setIsLoading(false);
            setSearchResult(data.filter(u => u._id !== user._id));
        } catch (error) {
            toast({
                title: 'קרתה שגיאה בחיפוש',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-right'
            });
            setIsLoading(false);
        };
    };

    const handleAddUser = async (userToAdd) => {
        if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
            toast({
                title: 'החבר/ה כבר בקבוצה',
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'bottom'
            });
            return;
        };

        try {
            setIsLoading(true);

            const { data } = await axios.put(`/api/chat/groupadd`, {
                chatId: selectedChat._id, userId: userToAdd._id
            }, config);

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setIsLoading(false);
        } catch (error) {
            toast({
                title: 'קרתה שגיאה בהוספת חבר/ה',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setIsLoading(false);
        };
    };

    return (
        <>
            {selectedChat.groupAdmin._id === user._id ? (
                <>
                    <IconButton onClick={onOpen} d={{ base: 'flex' }}
                        icon={<ViewIcon />} />

                    <Modal isOpen={isOpen} onClose={onClose} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader fontSize='35px' d='flex' justifyContent='center'>
                                {selectedChat.chatName}
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Box w='100%' d='flex' flexWrap='wrap' pb={3}>
                                    {selectedChat.users.map((u) => (
                                        <UserBadgeItem key={u._id} user={u}
                                            onClick={() => handleRemove(u)} />
                                    ))}
                                </Box>
                                <FormControl d='flex'>
                                    <Input placeholder='שם הקבוצה'
                                        mb={3} value={groupChatName}
                                        onChange={(e) => setGroupChatName(e.target.value)} />
                                    <Button variant='solid' colorScheme='orange'
                                        mr={1} isLoading={reNameLoading} onClick={handleRename}>
                                        עדכון הקבוצה
                                    </Button>
                                </FormControl>
                                <FormControl>
                                    <Input placeholder='צירוף חברים לקבוצה'
                                        mb={1} onChange={(e) => handleSearch(e.target.value)} />
                                </FormControl>

                                {isLoading
                                    ? (<Loader />)
                                    : (
                                        searchResult?.map((user) => (
                                            <UserItem key={user._id} user={user}
                                                onClick={() => handleAddUser(user)} />
                                        )
                                        ))}
                            </ModalBody>

                            <ModalFooter>
                                <Button onClick={() => handleRemove(user)}
                                    colorScheme='red'>
                                    יציאה מהקבוצה
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            ) : (
                <Button onClick={() => handleRemove(user)}
                    colorScheme='red'>
                    יציאה מהקבוצה
                </Button>
            )
            }
        </>
    )
}

export default UpdateGroupModal