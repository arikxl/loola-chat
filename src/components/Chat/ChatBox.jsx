import React from 'react';
import {
  Avatar, Box, Button, Drawer, DrawerBody, DrawerContent,
  DrawerFooter, DrawerHeader, DrawerOverlay, Input, Menu,
  MenuButton, MenuDivider,
  MenuItem, MenuList, Spinner, Text, Tooltip, useToast,
} from '@chakra-ui/react';


import { ChatState } from '../../context/chatProvider'
import SingleChat from './SingleChat';

const ChatBox = ({fetchAgain, setFetchAgain}) => {

  const { selectedChat } = ChatState()

  return (
    <Box d={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
      alignItems='center' flexDir='column' p={3} bg='white' 
      w={{ base: '100%', md: '69%' }} borderRadius='lg' borderWidth='1px'
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </Box>
  )
}

export default ChatBox