import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@chakra-ui/react';

import ChatList from '../components/Chat/ChatList';
import AppSideBar from '../components/app/AppSideBar';
import ChatDetails from '../components/Chat/ChatDetails';
import { ChatState } from '../context/chatProvider';


const ChatPage = () => {

    const { user } = ChatState()

    return (
        <div style={{width:'100%'}}>
            {user && <AppSideBar />}
            <Box d='flex' justifyContent='space-between' 
                 w='100%' h='92vh' p='10px'>
                {user && <ChatList />}
                {user && <ChatDetails />}
            </Box>
        </div>
    );
};

export default ChatPage;