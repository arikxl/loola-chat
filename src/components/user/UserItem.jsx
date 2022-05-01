import { Avatar, Box, Text } from '@chakra-ui/react';
import React from 'react'

const UserItem = ({ user, onClick }) => {

    const { name, img, email, _id } = user;

    return (
        <Box onClick={onClick} cursor='pointer'
            bg='#E8E8E8' w='100%' d="flex"
            alignItems='center' color='goldenrod'
            _hover={{ background: 'goldenrod', color: 'white' }}
            px={3} py={2} mb={2} borderRadius='lg'
        >
            <Avatar ml={2} size='sm' cursor='pointer'
                name={name} src={img || `https://avatars.dicebear.com/api/open-peeps/${_id}.svg`} />
                {/* name={name} src={img || `https://avatars.dicebear.com/api/adventurer-neutral/${email}.svg`} /> */}
            <Box>
                <Text>{name}</Text>
            </Box>
        </Box>
    )
}

export default UserItem