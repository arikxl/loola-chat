import React, { useState } from 'react';
import axios from 'axios';
import {
    Box, Button, DrawerBody, DrawerContent,
    DrawerFooter, DrawerHeader, DrawerOverlay, Input, useToast
} from '@chakra-ui/react';

import UserItem from '../user/UserItem';
import BearLoader from '../loaders/BearLoader';
import LoadingSkeleton from '../loaders/LoadingSkeleton';
import { getConfigWithJson } from '../../utils/chatUtils';
import { ChatState } from '../../context/chatProvider';


const AppSideBar = ({ onClose, setSearch, search }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(null);
    const [searchResult, setSearchResult] = useState([]);

    const { user, setSelectedChat, chats, setChats } = ChatState();
    const { token } = user;
    const config = getConfigWithJson(token);
    const toast = useToast();

    const handleSearch = async (e) => {
        if (e.key === 'Enter' && search && search.length > 1) {

            if (search === 'com' || search === '.il' || search === 'gmail' || search === '.co') {
                toast({
                    title: `חיפוש לא חוקי יא צ'יטר/ית`,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top-right'
                });
                return
            };
        };

        try {
            setIsLoading(true);

            const { data } = await axios.get(`/api/user?search=${search}`, config);
            setIsLoading(false);
            setSearchResult(data.filter(u => u._id !== user._id));
            if (data.length === 0) {
                toast({
                    title: 'אין חברים שמתאימים לחיפוש',
                    status: 'warning',
                    duration: 4000,
                    isClosable: true,
                    position: 'bottom-right'
                });
            }
        } catch (error) {
            toast({
                title: 'שגיאה בחיפוש',
                description: 'אין חברים שמתאימים לחיפוש',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-right'
            })
            setIsLoading(false);
        };
    };

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);

            const { data } = await axios.post(`/api/chat`, { userId }, config);
            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: `שגיאה בחיבור לצ'ט`,
                status: 'error',
                description: error.message,
                duration: 4000,
                isClosable: true,
                position: 'bottom-right'
            });
        };
    };

    return (
        <>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>
                    חיפוש חברים
                </DrawerHeader>
                <DrawerBody>
                    <Box d='flex' pb={2}>
                        <Input
                            placeholder='חיפוש לפי שם או אימייל'
                            onKeyDown={handleSearch}
                            ml={3} value={search} onChange={(e) =>
                                setSearch(e.target.value)} />
                        <Button onClick={handleSearch}>GO</Button>
                    </Box>
                    {isLoading ? <LoadingSkeleton />
                        : (
                            searchResult?.map((user, index) => (
                                <UserItem key={index} user={user}
                                    onClick={() => accessChat(user._id)} />
                            ))
                        )}
                    {/* {loadingChat && <Spinner ml='auto' d='flex' />} */}
                    {loadingChat && <BearLoader />}
                </DrawerBody>
                <DrawerFooter>
                    <Button variant='outline' ml={3} onClick={onClose}
                        backgroundColor='orange'>
                        סגירה
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </>
    );
};

export default AppSideBar;