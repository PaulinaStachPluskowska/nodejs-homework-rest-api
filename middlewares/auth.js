const passport = require('passport');

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const token = req.headers.authorization.slice(7);

    if (!user || token !== user.token || err) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = auth;