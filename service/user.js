const User = require('./schemas/userMongoose');

const addUser = (body) => {
    return User.create(body);
};

const getUser = (body) => { 
    return User.findOne(body);
};

const getAllUsers = () => { 
    return User.find({}).distinct('email');
};

const getUserByEmail = (email) => {
    return User.findOne( email );
};

const getUserById = (id) => {
    return User.findById( id );
};

const updateUser = (id, body) => {
    return User.findByIdAndUpdate( id, body, { new: true });
};

module.exports = { addUser, getUser, getAllUsers, getUserByEmail, getUserById, updateUser, };
