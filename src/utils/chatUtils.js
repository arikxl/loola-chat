export const getSender = (user, users) => {
    console.log('users:', users)
    return users[0]._id === user._id ? users[1].name : users[0].name;
};