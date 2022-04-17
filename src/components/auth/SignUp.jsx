import React, { useState } from 'react';
import { Button, FormControl, FormLabel,
         Input, InputGroup, InputLeftElement,
          VStack 
} from '@chakra-ui/react';

const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [img, setImg] = useState('');

  const [show, setShow] = useState(false);

  const postDetails = (images) => {
    console.log('images:', images)
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('name:', name)
    // console.log('email:', email)
    // console.log('password:', password)
    // console.log('confirmPassword:', confirmPassword)
    // console.log('img:', img)
    // postDetails(img)
  }


  return (
    <VStack spacing={'5px'}>
      <FormControl id='userName' isRequired>
        <FormLabel>
          שם משתמש.ת
        </FormLabel>
        <Input placeholder='מה השם שלך?'
          onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl id='email' isRequired>
        <FormLabel>
          כתובת מייל
        </FormLabel>
        <Input placeholder='מה המייל שלך?' type='email'
          onChange={(e) => setEmail(e.target.value)} />
      </FormControl>

      <FormControl id='password' isRequired>
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

      <FormControl id='img' isRequired>
        <FormLabel>
          תמונה מהממת בבקשה
        </FormLabel>
        <Input type='file' p={1.5} accept={ 'image/*' }
          onChange={(e) => postDetails(e.target.files[0])} />
      </FormControl>

      <Button colorScheme={'orange'} width='100%'
      style={{marginTop: 15}} onClick={handleSubmit}>
        רישום לצ'ט
      </Button>

    </VStack>
  )
}

export default SignUp