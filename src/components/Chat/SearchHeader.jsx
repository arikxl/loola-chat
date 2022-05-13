import React from 'react';
import { Button, Text, Tooltip } from '@chakra-ui/react';

const SearchHeader = ({onOpen}) => {
    return (
        <Tooltip label='חיפוש חברים' hasArrow placement='bottom-end'>
            <Button variant='ghost' onClick={onOpen}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <Text d={{ base: 'none', md: 'flex' }} px='4'>
                    חיפוש חברים
                </Text>
            </Button>
        </Tooltip>
    );
};

export default SearchHeader;