import React from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import {
    Box, Button, IconButton, Modal, ModalBody,
    useToast, ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader, ModalOverlay, Stack, Text
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import { ChatState } from '../../context/chatProvider';
import { useState } from 'react';
import UserBadgeItem from '../user/UserBadgeItem';


const UpdateGroupModal = ({ fetchAgain, setFetchAgain }) => {

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState('');
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [reNameLoading, setReNameLoading] = useState(false);

    const { selectedChat, setSelectedChat, user } = ChatState();

    // toast({
    //     title: 'קבוצה מגניבה חייבת שם מגניב',
    //     status: 'error',
    //     duration: 5000,
    //     isClosable: true,
    //     position: 'bottom-right',
    // })
    const handleDelete = (userToDelete) => {
        // setSelectedUsers(selectedUsers.filter(user => user._id !== userToDelete._id));
    };
    return (
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
                        <Box>
                            {selectedChat.users.map((u) => (
                                <UserBadgeItem key={u._id} user={u}
                                onClick={() => handleDelete(u)}/>
                            ))}
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupModal