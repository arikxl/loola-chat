import React from 'react';
import ScrollableFeed from 'react-scrollable-feed'
import { Avatar, Tooltip } from '@chakra-ui/react';

import { ChatState } from '../../context/chatProvider';
import {
    isLastMessage, isSameSender, isSameSenderMargin, isSameUser
} from '../../utils/chatUtils';

const ScrollableChat = ({ messages }) => {

    const { user } = ChatState();

    return (
        <ScrollableFeed>
            {messages && messages.map((message, index) => (
                <div key={message._id} style={{ display: 'flex' }}>
                    {(isSameSender(messages, message, index, user._id)
                        || isLastMessage(messages, index, user._id)) && (
                            <Tooltip label={message.sender.name}
                                placement='bottom-start'
                                hasArrow>
                                <Avatar mt='7px'
                                    ml={1}
                                    size='sm'
                                    cursor='pointer'
                                    name={message.sender.name}
                                    src={message.sender.img} />
                            </Tooltip>
                        )}
                    <span className='chatSpan' style={{
                        backgroundColor:
                            `${message.sender._id === user._id ? 'goldenrod' : 'orange'}`,
                        marginRight: isSameSenderMargin(messages, message, index, user._id),
                        marginTop: isSameUser(messages, message, index) ? '3px' : '10px',
                    }}>
                        {message.content}
                    </span>
                </div>
            ))}
        </ScrollableFeed>
    );
};

export default ScrollableChat;