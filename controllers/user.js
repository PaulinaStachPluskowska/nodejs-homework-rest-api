const service = require('../service/user');
const { userSignInSchema, userSignUpSchema, userUpdateSchema } = require('../service/schemas/userJoi');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;

const singUp = async (req, res, next) => { 
    try {
        const allUsers = await service.getAllUsers();
        let { email, password, subscription } = await req.body;

        if (allUsers.includes(email)) {
            return res.status(409).json({ message: 'Email is in use!' });
        }

        if (!subscription) { 
            subscription = 'starter';
        }

        const { error } = userSignUpSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        const passwordEncrypted = await bcrypt.hash(password, 10);
        const newUser = await service.addUser({ email, password: passwordEncrypted, subscription, });
        
        if (!newUser) {
            res.status(409).json({ message: `Can't create user!` });
        } else { 
            res.status(201).json(newUser);
        }
    } catch (error) { 
        console.error(error.message);
        next(error);        
    }
}; 

const login = async (req, res, next) => {
    try { 
        let { email, password, subscription } = await req.body;
        subscription = 'starter';

        const { error } = userSignInSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        const user = await service.getUserByEmail({ email });
        if (!user) { 
            res.status(401).json({ message: 'Email or password is wrong' });
            return;
        }

        const passwordCompared = await bcrypt.compare(password, user.password);
        if (!passwordCompared) { 
            res.status(401).json({ message: 'Email or password is wrong' });
            return;
        }

        const payload = {
            id: user.id,
            username: user.email,
        };

        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        await service.updateUser({ _id: user.id, body: { token } });
        res.status(200).json({ token, user: {email, subscription,}, });

    } catch (error) { 
        console.error(error.message);
        next(error);  
    }
};

const logout = async (req, res, next) => {
    try { 
        const { _id } = await req.user;
        const user = await service.getUserById({ _id });
        if (!user) { 
            res.status(401).json({ message: 'Not authorized' });
            return;
        }

        await service.updateUser({ _id: user.id, body: { token: null }, });
        res.status(204).json();
    } catch (error) { 
        console.error(error.message);
        next(error);  
    }
};


const current = async(req, res, next) => {
    try { 
        const { email } = req.user;
        const user = await service.getUserByEmail({ email });
        if (!user) { 
            res.status(401).json({ message: 'Not authorized' });
            return;
        }
        res.json({ email: user.email, subscription: user.subscription, });
    } catch (error) { 
        console.error(error.message);
        next(error);  
    }
};

const updateSubscription = async (req, res, next) => { 
    try { 
        const { _id } = await req.user;
        const { subscription } = await req.body;

        const { error } = userUpdateSchema.validate({ subscription });
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        const user = await service.updateUser({ _id, body: { subscription } });
        if (!user) { 
            res.status(401).json({ message: 'Not authorized' });
            return;
        }
        res.json({
            user: { email: user.email, subscription: user.subscription, }
        });

    } catch (error) { 
        console.error(error.message);
        next(error);  
    }
};

module.exports = { singUp, login, logout, current, updateSubscription, };