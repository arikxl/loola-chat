import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Avatar, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList
} from '@chakra-ui/react';

import AppProfileModal from '../app/AppProfileModal';

const MyProfile = ({ user }) => {

    const navigate = useNavigate();
    const { name, img, _id } = user;

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('chatUserInfo');
            navigate('/');
        };
    };

    return (
        <Menu >
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                <Avatar size='sm' cursor='pointer' name={name}
                    src={img || `https://robohash.org/${_id}?set=set4`} />
                {/* src={img || `https://avatars.dicebear.com/api/open-peeps/${_id}.svg`} /> */}
            </MenuButton>
            <MenuList>
                <AppProfileModal>
                    <MenuItem>אני עצמי ואנוכי</MenuItem>
                </AppProfileModal>
                <MenuDivider />
                <MenuItem onClick={handleLogout}>התנתקות</MenuItem>
            </MenuList>
        </Menu>
    );
};

export default MyProfile;