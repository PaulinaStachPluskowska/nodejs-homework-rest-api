const passport = require('passport');

const auth = (req, res, next) => { 
    passport.authenticate('jwt', { session: false }, (error, user) => {
        const reqToken = req.headers.authorization.slice(7); 
        if (!user || error || reqToken !== user.token) {
            return res.status(401).json({ message: 'Not authorized!' });
        }
        req.user = user;
        next();
    })(req, res, next);
};

module.exports = auth;