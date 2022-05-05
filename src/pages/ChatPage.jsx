import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@chakra-ui/react';

import ChatList from '../components/Chat/ChatList';
// import AppSideBar from '../components/app/AppSideBar';
import ChatBox from '../components/Chat/ChatBox';
import { ChatState } from '../context/chatProvider';
import ChatHeader from '../components/Chat/ChatHeader';


const ChatPage = () => {

    const { user } = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);


    return (
        <div style={{ width: '100%' }}>
            {user && <ChatHeader />}
            <Box d='flex' justifyContent='space-between'
                w='100%' h='92vh' p='10px'>
                {user && <ChatList fetchAgain={fetchAgain}/>}
                {user && <ChatBox
                    fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </Box>
        </div>
    );
};

export default ChatPage;