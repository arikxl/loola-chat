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
                {!notifications.length && ' ๐งก ืืื ืืืืขืืช ืืืฉืืช ๐งก'}
                {notifications?.map((n) => (
                    <MenuItem key={n._id} onClick={() => {
                        setSelectedChat(n.chat);
                        setNotifications(notifications.filter((not) => not !== n));
                    }}>
                        {n.chat.isGroupChat
                            ? `ืืืืขื ืืืฉื ื${n.chat.chatName}`
                            : `ืืืืขื ืืืฉื ื${getSender(user, n.chat.users)}`
                        }
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};

export default Notifications;