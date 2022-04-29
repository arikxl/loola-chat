import { useEffect } from 'react';
import { useState } from 'react';
import { useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';


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
}


export default ChatProvider;