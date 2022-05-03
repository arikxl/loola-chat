import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast} from '@chakra-ui/react';


import { ChatState } from '../../context/chatProvider';

const ChatList = () => {

  const toast = useToast();
  const [loggedUser, setLoggedUser] = useState(null);
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const { name, img, token, _id } = user;
  // console.log('token:', token)
  // console.log('_id:', _id)
  
  const fetchChats = async () => {
    try {
      const config = {
        Headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      
      const { data} = await axios.get('/api/chat', config);
      
      if(!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      
      setChats(data);
    } catch (error) {
      console.log('AAAA', error.message)
      toast({
        title: `שגיאה חמורה!`,
        status: 'error',
        description: `לא ניתן לפתוח את הצ'ט`,
        duration: 4000,
        isClosable: true,
        position: 'bottom-right'
      });
    }
  }; 

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('chatUserInfo')));
    fetchChats();
  },[])

  return (
    <div>ChatList</div>
  )
}

export default ChatList