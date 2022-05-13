import { AddIcon } from '@chakra-ui/icons'
import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import GroupChatModal from '../groups/GroupChatModal'

const ChatListHeadLine = () => {
    return (
        <Box pb={3} px={3} fontSize={{ base: '28px', md: '30px' }} w='100%'
            d='flex' justifyContent='space-between' alignItems='center'>
            הצ'טים שלי
            
            <GroupChatModal>
                <Button d='flex' fontSize={{ base: '17px', md: '10px', lg: '17px' }}
                    leftIcon={<AddIcon />}>
                    קבוצה חדשה
                </Button>
            </GroupChatModal>
        </Box>
    );
};

export default ChatListHeadLine;