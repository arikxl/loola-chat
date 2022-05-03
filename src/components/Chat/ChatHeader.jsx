import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar, Box, Button, Drawer, DrawerBody, DrawerContent,
  DrawerFooter, DrawerHeader, DrawerOverlay, Input, Menu,
  MenuButton, MenuDivider,
  MenuItem, MenuList, Spinner, Text, Tooltip, useToast,
} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/hooks';
import axios from 'axios';

import { ChatState } from '../../context/chatProvider';
import AppProfileModal from '../app/AppProfileModal';
import LoadingSkeleton from '../loaders/LoadingSkeleton';
import UserItem from '../user/UserItem';
import BearLoader from '../loaders/BearLoader';

const ChatHeader = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate();
  const toast = useToast();
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const { name, img, token, _id } = user;
  // console.log('token:', token)

  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('chatUserInfo');
      navigate('/');
    }
  };

  const handleSearch = async () => {
    if (!search || search.length < 2) {
      toast({
        title: 'בבקשה לפחות 2 אותיות לחיפוש',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'top-right'
      });
      return
    };

    try { 
      setIsLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        }
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setIsLoading(false);
      setSearchResult(data);
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
    }
  };

  const accessChat = async (userId) => {
     try {
      setLoadingChat(true);

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        }
      };

      const {data} = await axios.post(`/api/chat`,  { userId } , config);
      if(!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

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
     }
  };


  return (
    <>
      <Box d='flex' justifyContent='space-between' alignItems='center'
        bg='white' w='100%' p='5px 10px' borderWidth='3px'>
        <Tooltip label='חיפוש חברים' hasArrow placement='bottom-end'>
          <Button variant='ghost' onClick={onOpen}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text d={{ base: 'none', md: 'flex' }} px='4'>
              חיפוש חברים
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize='2xl' >Loola-Chat</Text>

        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize='2xl' m='1' />
            </MenuButton>
            {/* <MunuList></MunuList> */}
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar size='sm' cursor='pointer' name={name}
                src={img || `https://robohash.org/${_id}?set=set4`} />
              {/* src={img || `https://avatars.dicebear.com/api/open-peeps/${_id}.svg`} /> */}

            </MenuButton>
            <MenuList>
              <AppProfileModal user={user}>
                <MenuItem>אני עצמי ואנוכי</MenuItem>
              </AppProfileModal>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>התנתקות</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>



      <Drawer isOpen={isOpen} placement='right' onClose={onClose}
      // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>

          <DrawerHeader borderBottomWidth='1px'>
            חיפוש חברים
          </DrawerHeader>

          <DrawerBody>
            <Box d='flex' pb={2}>
                <Input placeholder='חיפוש לפי שם או אימייל'
                  ml={3} value={search} onChange={(e) => setSearch(e.target.value)} />
                <Button onClick={handleSearch}>GO</Button>
            </Box>
            {isLoading ? <LoadingSkeleton />
              : (
                searchResult?.map((user, index) => (
                  <UserItem key={index} user={user}
                    onClick={() => accessChat(user._id)} />
                ))
              )}

              {/* {loadingChat && <Spinner ml='auto' d='flex'/>} */}
              {loadingChat && <BearLoader />}
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' ml={3} onClick={onClose}>
              סגירה
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default ChatHeader