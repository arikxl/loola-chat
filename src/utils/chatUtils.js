export const getSender = (user, users) => {
    return users[0]._id === user._id ? users[1].name : users[0].name;
};