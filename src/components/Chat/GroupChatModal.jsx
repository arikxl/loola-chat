import React from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import {
    Button, Modal, ModalBody, ModalCloseButton, useToast,
    ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormControl, Input, Box
} from '@chakra-ui/react';
import { useState } from 'react';
import { ChatState } from '../../context/chatProvider';
import axios from 'axios';
import UserItem from '../user/UserItem';
import UserBadgeItem from '../user/UserBadgeItem';



const GroupChatModal = ({ children }) => {

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { user, chats, setChats } = ChatState();
    const { token } = user;


    const handleSearch = async (query) => {
        setSearch(query);
        if (!query || query.length < 2) return;

        try {
            setIsLoading(true);

            const config = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            };

            const { data } = await axios.get(`/api/user?search=${search}`, config);
            setIsLoading(false);
            setSearchResult(data.filter(u => u._id !== user._id));
        } catch (error) {
            toast({
                title: 'קרתה שגיאה בחיפוש',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left',
            })
        }
    };

    const handleSubmit = async () => {
        if(!groupChatName || groupChatName.length < 3) {
            toast({
                title: 'קבוצה מגניבה חייבת שם מגניב',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-right',
            })
            return;
        };
        if(!selectedUsers || selectedUsers.length < 2) {
            toast({
                title: 'אין קבוצה בלי חברים',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-right',
            })
            return;
        };

        try {
            
            const config = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            };

            const { data } = await axios.post('/api/chat/group', {
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map(u => u._id))
            }, config);

            setChats([data, ...chats]);
            onClose();
            toast({
                title: '🚀 קבוצה פצצה 🚀',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom-right',  
            });
        } catch (error) {
            toast({
                title: 'קרתה שגיאה',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-right',
            });
        }

    };

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast({
                title: 'החבר/ה כבר בקבוצה',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'bottom-right',
            })
            return;
        };
        setSelectedUsers([...selectedUsers, userToAdd]);
    };

    const handleDelete = (userToDelete) => {
        setSelectedUsers(selectedUsers.filter(user => user._id !== userToDelete._id));
    };

    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader d='flex' justifyContent='center' fontSize='35px'>
                        פתיחת קבוצה חדשה
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody d='flex' flexDir='column' alignItems='center'>
                        <FormControl>
                            <Input placeholder='שם הקבוצה' mb={3}
                                onChange={(e) => setGroupChatName(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <Input placeholder='הוספת חברים' mb={1}
                                onChange={(e) => handleSearch(e.target.value)} />
                        </FormControl>
                        <Box w='100%' d='flex' flexWrap='wrap'>
                            {selectedUsers.map((user) => (
                                <UserBadgeItem key={user._id}
                                    user={user} onClick={() => handleDelete(user)} />
                            ))}
                        </Box>
                        {isLoading
                            ? <div>טוען...</div>
                            : (
                                searchResult?.slice(0, 4).map((user) => (
                                    <UserItem key={user._id} user={user}
                                        onClick={() => handleGroup(user)} />
                                ))
                            )}

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='orange' onClick={handleSubmit}>
                            תהנו!
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModal