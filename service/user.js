const User = require('./schemas/userMongoose');

const addUser = (body) => {
    return User.create(body);
};

const getAllUsers = () => { 
    return User.find({}).distinct('email');
};

const getUserByEmail = (email) => {
    return User.findOne({ email });
};

const getUserById = (id) => {
    return User.findById({ _id: id });
};

const updateUser = (id, body) => {
    return User.findByIdAndUpdate({ _id: id }, body, { new: true });
};

module.exports = { addUser, getAllUsers, getUserByEmail, getUserById, updateUser, };
