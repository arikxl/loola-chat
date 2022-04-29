import React, { useState } from 'react'
import { Avatar, Box, Button, Menu, MenuButton, MenuDivider,
         MenuItem, MenuList, Text, Tooltip 
} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';

import { ChatState } from '../../context/chatProvider';

const AppSideBar = () => {

  const { user } = ChatState()
  const {name, img} = user;

  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(null);


  return (
    <>
      {isLoading && <div>Loading...</div>}
      <Box d='flex' justifyContent='space-between' alignItems='center'
        bg='white' w='100%' p='5px 10px' borderWidth='3px'>
        <Tooltip label='חיפוש חברים' hasArrow placement='bottom-end'>
          <Button variant='ghost'>
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
              src={img}/>
            </MenuButton>
            <MenuList>
              <MenuItem>אני עצמי ואנוכי</MenuItem>
              <MenuDivider />
              <MenuItem>התנתקות</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  )
}

export default AppSideBar