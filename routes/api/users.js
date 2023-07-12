const express = require('express');
const userController = require('../../controllers/user');
const auth = require('../../middlewares/auth');
const { upload } = require('../../middlewares/avatar');

const router = express.Router();

router.post('/signup', userController.singUp);

router.post('/login', userController.login);

router.post('/verify', userController.resendVerificationEmail);

router.get('/verify/:verificationToken', userController.verifyEmail);

router.get('/', userController.getAll);

router.get('/logout', auth, userController.logout);

router.get("/current", auth, userController.current);

router.patch('/', auth, userController.updateSubscription);

router.patch('/avatars', auth, upload.single('avatar'), userController.updateAvatar);

module.exports = router;