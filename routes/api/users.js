const express = require('express');
const userController = require('../../controllers/user');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/signup', userController.singUp);

router.post('/login', userController.login);

router.get('/', userController.getAll);

router.get('/logout', auth, userController.logout);

router.get("/current", auth, userController.current);

router.patch('/', auth, userController.updateSubscription);

module.exports = router;