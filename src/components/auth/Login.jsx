import React, { useState } from 'react';
import { Button, FormControl, FormLabel,
         Input, InputGroup, InputLeftElement,
          VStack 
} from '@chakra-ui/react';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [show, setShow] = useState(false);


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
          <Input placeholder= 'סיסמא בבקשה'
            type={show ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)} />
        </InputGroup>
      </FormControl>

      <Button colorScheme={'orange'} width='100%'
      style={{marginTop: 15}} onClick={handleSubmit}>
        התחברות לצ'ט
      </Button>

      <Button colorScheme={'red'} width='100%'
      variant={'solid'}
      style={{marginTop: 15}} 
      onClick={()=> {setEmail('guest@example.com'); setPassword('123456');}}>
        התחברות לצ'ט כאורח.ת
      </Button>

    </VStack>
  )
}

export default Login