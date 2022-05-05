import React from 'react'
import { Box } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const UserBadgeItem = ({ user, onClick }) => {

    const { name } = user;

    return (

        <Box px={2} py={1} borderRadius='lg' m={1} mb={2}
            variant='solid' fontSize={16} backgroundColor='orange'
            cursor='pointer' onClick={onClick} color='white'>
            {name}
            <CloseIcon pr={1} fontSize={16} />
        </Box>
    );
};

export default UserBadgeItem;