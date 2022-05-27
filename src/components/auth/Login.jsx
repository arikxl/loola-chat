import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button, FormControl, FormLabel,
  Input, InputGroup, InputLeftElement,
  useToast,
  VStack
} from '@chakra-ui/react';
import { ChatState } from '../../context/chatProvider';


const Login = () => {

  const { setUser } = ChatState();
  const toast = useToast();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: 'נא למלא את כל השדות',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      setLoading(false);
      return
    }

    try {
      const config = {
        Headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post('/api/user/login',
        { email, password }, config
      );
      toast({
        title: 'התחברת בהצלחה',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      localStorage.setItem('chatUserInfo', JSON.stringify(data));
      if (data) {
        setUser(data);
        setLoading(false);
        setTimeout(() => {
          navigate('/chats');
          navigate(0);
        }, 1000);
      }
    }
    catch (err) {
      toast({
        title: 'התחברות נכשלה',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
        description: err.response.data.message,
      });
      setLoading(false);
    }
  }

  return (
    <VStack spacing={'5px'}>

      <FormControl id='email' isRequired>
        <FormLabel>
          כתובת מייל
        </FormLabel>
        <Input placeholder='מה המייל שלך?' type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
      </FormControl>

      <FormControl id='password' isRequired>
        <FormLabel>סיסמא</FormLabel>
        <InputGroup>
          <InputLeftElement width={'4.5rem'}>
            <Button h="1.75rem" size={'sm'} w={'3rem'}
              onClick={() => setShow(!show)}>
              {show ? 'הסתר' : 'הצג'}
            </Button>
          </InputLeftElement>
          <Input placeholder='סיסמא בבקשה'
            value={password}
            type={show ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)} />
        </InputGroup>
      </FormControl>

      <Button colorScheme={'orange'} width='100%'
        isLoading={loading}
        style={{ marginTop: 15 }} onClick={handleSubmit}>
        התחברות לצ'ט
      </Button>
      {/* <Button colorScheme={'red'} width='100%'
        variant={'solid'} isLoading={loading}
        style={{ marginTop: 15 }}
        onClick={() => { setEmail('guest@example.com'); setPassword('123456'); }}>
        התחברות לצ'ט כאורח.ת
      </Button> */}
    </VStack>
  );
};

export default Login;