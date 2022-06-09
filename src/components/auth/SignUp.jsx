import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button, FormControl, FormLabel,
  Input, InputGroup, InputLeftElement,
  VStack, useToast,
} from '@chakra-ui/react';


const SignUp = () => {

  const [img, setImg] = useState('');
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toast = useToast();
  const navigate = useNavigate();

  const postDetails = (images) => {
    setLoading(true);

    if (images.type === 'image/jpeg' || images.type === 'image/png') {
      const data = new FormData();
      data.append('file', images);
      data.append('upload_preset', 'loola-chat');
      data.append('cloud_name', 'arikxl');
      fetch('https://api.cloudinary.com/v1_1/arikxl/image/upload', {
        method: 'post',
        body: data
      }).then((res) => res.json())
        .then((data) => {
          setImg(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log('err:', err)
          setLoading(false);
        });
    } else {
      toast({
        title: 'נא להעלות תמונה מסוג jpeg או png',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
      setLoading(false);
      return
    }
  };

  const handleSubmit =  async () => {
    if ( !email.includes('@') || !email.includes('.') ) {
      toast({
        title: 'נא להזין כתובת אימייל תקינה',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      return
    };
    setLoading(true);
    if(!name || !email || !password || !confirmPassword){
      toast({
        title: 'נא למלא את כל השדות',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      setLoading(false);
      return
    };
    if(password !== confirmPassword){
      toast({
        title: 'סיסמאות לא תואמות',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axios.post('/api/user',
       {name, email, password, img}, config);
      toast({
        title: 'הצטרפת בהצלחה',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });

      localStorage.setItem('chatUserInfo', JSON.stringify(data));
      setLoading(false);

      setTimeout(() => {
        navigate('/chats');
        navigate(0);
      } , 2000);
    } catch (error) {
      toast({
        title: 'הרישום לא הצליח',
        status: 'error',
        duration: 5000,
        description: error.response.data.message,
        isClosable: true,
        position: 'top',
      });
      setLoading(false);
    }
  }

  return (
    <VStack spacing={'5px'}>
      <FormControl id='userName' isRequired>
        <FormLabel>
          השם שלך
        </FormLabel>
        <Input placeholder='מה השם שלך?'
          onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl id='form_email' isRequired type='email'>
        <FormLabel>
          כתובת מייל
        </FormLabel>
        <Input placeholder='מה המייל שלך?' type='email' isRequired
          onChange={(e) => setEmail(e.target.value)} />
      </FormControl>

      <FormControl id='form_password' isRequired>
        <FormLabel>סיסמא</FormLabel>
        <InputGroup >
          <InputLeftElement width={'4.5rem'}>
            <Button h="1.75rem" size={'sm'} w={'3rem'}
              onClick={() => setShow(!show)}>
              {show ? 'הסתר' : 'הצג'}
            </Button>
          </InputLeftElement>
          <Input placeholder='סיסמא קשה בבקשה'
            type={show ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)} />
        </InputGroup>
      </FormControl>

      <FormControl id='passwordConfirm' isRequired>
        <FormLabel>אישור סיסמא</FormLabel>
        <InputGroup>
          <InputLeftElement width={'4.5rem'}>
            <Button h="1.75rem" size={'sm'} w={'3rem'}
              onClick={() => setShow(!show)}>
              {show ? 'הסתר' : 'הצג'}
            </Button>
          </InputLeftElement>
          <Input placeholder='שוב להקליד את הסיסמא'
            type={show ? 'text' : 'password'}
            onChange={(e) => setConfirmPassword(e.target.value)} />
        </InputGroup>
      </FormControl>

      <FormControl id='img' >
        <FormLabel>
            תמונה מהממת בבקשה
        </FormLabel>
        <Input type='file' p={1.5} accept={'image/*'}
          onChange={(e) => postDetails(e.target.files[0])} />
      </FormControl>
      <Button colorScheme={'orange'} width='100%'
        style={{ marginTop: 15 }} onClick={handleSubmit}
        isLoading = {loading}>
        רישום לצ'ט
      </Button>
    </VStack>
  );
};

export default SignUp;