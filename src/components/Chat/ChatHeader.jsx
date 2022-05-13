import React, { useState } from 'react';
import { Box, Drawer, Text } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';

import MyProfile from './MyProfile';
import AppSideBar from '../app/AppSideBar';
import SearchHeader from './SearchHeader';
import Notifications from './Notifications';
import { ChatState } from '../../context/chatProvider';

const ChatHeader = () => {

  const { onOpen, onClose, isOpen } = useDisclosure()
  const { user, setSelectedChat, notifications, setNotifications
  } = ChatState();

  const [search, setSearch] = useState('');

  return (
    <>
      <Box d='flex' justifyContent='space-between' alignItems='center'
        bg='white' w='100%' p='5px 10px' >
        <SearchHeader onOpen={onOpen} />
        <Text fontSize='2xl' >Loola-Chat</Text>
        <div>
          <Notifications notifications={notifications}
            setNotifications={setNotifications}
            setSelectedChat={setSelectedChat} user={user} />
          <MyProfile user={user} />
        </div>
      </Box>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <AppSideBar setSearch={setSearch} onClose={onClose}
          search={search} />
      </Drawer>
    </>
  );
};

export default ChatHeader;