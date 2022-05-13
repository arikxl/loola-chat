export const getSender = (user, users) => {
    return users[0]._id === user._id ? users[1].name : users[0].name;
};
export const getSenderImg = (user, users) => {
    return users[0]._id === user._id ? users[1].img : users[0].img;
};

export const getFullSender = (user, users) => {
    return users[0]._id === user._id ? users[1] : users[0];
};

export const getConfig =(token)=> {
    return {headers: {
        authorization: `Bearer ${token}`
    }}
};

export const getConfigWithJson =(token)=> {
    return {headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
    }}
};

export const isSameSender =(messages, currentMessage, index, userId) => {
    return (
        index < messages.length -1  &&
        (messages[index +1].sender._id !== currentMessage.sender._id ||
            messages[index +1].sender._id === undefined) &&
        messages[index].sender._id !==userId
    );
};

export const isLastMessage =(messages, index, userId) => {
    return (
        index === messages.length -1 && 
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    );
};

export const isSameSenderMargin = (messages, currentMessage, index, userId) => {
    if (
        index < messages.length -1 &&
        messages[index +1].sender._id === currentMessage.sender._id &&
        messages[index].sender._id !== userId
    )
    return 33;

    else if (
        (index < messages.length -1 && 
            messages[index +1].sender._id !== currentMessage.sender._id &&
            messages[index].sender._id !== userId) || 
            (index === messages.length -1 && messages[index].sender._id !== userId) 
    )
    return 0;
     else return 'auto';
};

export const isSameUser = (messages, currentMessage, index) => {
    return index > 0 && messages[index -1].sender._id === currentMessage.sender._id;
};