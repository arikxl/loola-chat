import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext, createContext } from 'react';

const ChatContext = createContext();

const ChatProvider = ({children}) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const chatUserInfo = JSON.parse(localStorage.getItem('chatUserInfo'));
        setUser(chatUserInfo);

        if(!chatUserInfo) {
        navigate('/');
        };
    },[navigate]);

    return (
        <ChatContext.Provider value={{ user, setUser}}>
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = () => {
    return useContext(ChatContext)
};

export default ChatProvider;