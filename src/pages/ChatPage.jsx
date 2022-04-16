import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const ChatPage = () => {

    const [chats, setChats] = useState([])

    const fetchChats = async () => {
        const { data } = await axios.get('/api/chats');
        setChats(data);
    }

    useEffect(() => {
        fetchChats()
    }, [])


    return (
        <div>
            {chats.length > 0 && (
                <>
                    <h1>Chats:</h1>
                    {
                        chats.map(chat => (
                            <div key={chat._id}>
                                <h3>{chat.chatName}</h3>
                            </div>
                        ))
                    }
                </>
            )}
        </div>
    );
};

export default ChatPage;