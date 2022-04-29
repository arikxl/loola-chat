import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Tab, TabList,
  TabPanel, TabPanels, Tabs, Text
} from '@chakra-ui/react';

import Login from '../components/auth/Login';
import SignUp from '../components/auth/SignUp';

const HomePage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('chatUserInfo'));

    if (user) {
      navigate('/chats');
    };
  }, [navigate]);

  return (
    <Container maxW='xl' centerContent>
      <Box
        d='flex' justifyContent='center' p={3}
        bg={'white'} w='100%' m='20px 0 15px 0'
        borderRadius='lg' borderWidth='1px' >
        <Text fontSize='4xl' >Loola-Chat</Text>
      </Box>
      <Box bg={'white'} w='100%' p={4}
        borderRadius='lg' borderWidth='1px'>
        <Tabs variant='soft-rounded' colorScheme='yellow'>
          <TabList mb='1em'>
            <Tab w='50%'>התחברות</Tab>
            <Tab w='50%'>רישום</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;