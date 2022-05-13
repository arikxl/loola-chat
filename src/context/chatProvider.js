import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext, createContext } from 'react';

const ChatContext = createContext();

const ChatProvider = ({children}) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const chatUserInfo = JSON.parse(localStorage.getItem('chatUserInfo'));
        setUser(chatUserInfo);

        if(!chatUserInfo) {
        navigate('/');
        };
    },[navigate]);

    return (
        <ChatContext.Provider
             value={{ user, setUser, selectedChat, setSelectedChat,
              chats, setChats, notifications, setNotifications
            }}>
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = () => {
    return useContext(ChatContext)
};

export default ChatProvider;