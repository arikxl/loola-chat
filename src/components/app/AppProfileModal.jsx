import React from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import {
    Button, IconButton, Image, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';


const AppProfileModal = ({ user, children }) => {

    const { name, img, email, _id } = user;

    const { isOpen, onOpen, onClose } = useDisclosure();


    return (
        <>
            {children
                ? <span onClick={onOpen}>{children}</span>
                : <IconButton d={{ base: 'flex' }} icon={<ViewIcon />} onClick={onOpen} />
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
                            : `https://avatars.dicebear.com/api/adventurer-neutral/${_id}.svg`
                        }
                            alt={name}
                            borderRadius='full' boxSize='150px' />
                        <Text fontSize={{ base: '28px', md: '30px' }}>
                            {email}
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='orange' mr={3} onClick={onClose} >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AppProfileModal