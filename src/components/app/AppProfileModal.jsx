import React from 'react';
import { ViewIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/hooks';
import {
    Button, IconButton, Image, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text
} from '@chakra-ui/react';
import { ChatState } from '../../context/chatProvider';

const AppProfileModal = ({ children }) => {

    const { user } = ChatState();
    const { name, img, email, _id } = user;
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {children
                ? <span onClick={onOpen}>{children}</span>
                : <IconButton d={{ base: 'flex' }} icon={<ViewIcon />}
                    onClick={onOpen} />
            }

            <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered>
                <ModalOverlay />
                <ModalContent h='400px'>
                    <ModalHeader fontSize='40px' d='flex' justifyContent='center'>
                        {name}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody alignItems='center' d='flex' flexDirection='column'>
                        <Image src={img ? img
                            : `https://robohash.org/${_id}?set=set4`
                            // : `https://avatars.dicebear.com/api/open-peeps/${_id}.svg`
                        }
                            alt={name}
                            borderRadius='full' boxSize='150px' />
                        <Text fontSize={{ base: '28px', md: '30px' }}>
                            {email}
                        </Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AppProfileModal;