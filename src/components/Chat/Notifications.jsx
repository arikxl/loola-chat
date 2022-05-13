import React from 'react';
import { BellIcon } from '@chakra-ui/icons';
import { getSender } from '../../utils/chatUtils';
import  NotificationBadge, {Effect}  from 'react-notification-badge';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

const Notifications = ({notifications,setNotifications, setSelectedChat, user}) => {
    return (
        <Menu>
            <MenuButton p={1}>
                <NotificationBadge count={notifications.length}
                    effect={Effect.SCALE} />
                <BellIcon fontSize='2xl' m='1' />
            </MenuButton>
            <MenuList pr={3}>
                {!notifications.length && ' 🧡 אין הודעות חדשות 🧡'}
                {notifications?.map((n) => (
                    <MenuItem key={n._id} onClick={() => {
                        setSelectedChat(n.chat);
                        setNotifications(notifications.filter((not) => not !== n));
                    }}>
                        {n.chat.isGroupChat
                            ? `הודעה חדשה ב${n.chat.chatName}`
                            : `הודעה חדשה מ${getSender(user, n.chat.users)}`
                        }
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};

export default Notifications;