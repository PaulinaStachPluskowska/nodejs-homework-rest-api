const transporter = require('./config-nodemailer');
const User = require('../service/schemas/userMongoose');
require('dotenv').config(); 

const sendVerificationEmail = async (userEmail, userToken) => { 
    try { 
        // const serverURL = `${process.env.BASE_URL}:${process.env.API_PORT}` || `http://localhost:3000`;
        const verificationLink = `http://localhost:3000/api/users/verify/${userToken}`;
        
        await User.findOneAndUpdate({ email: userEmail }, { verificationToken: userToken }, { new: true },);
        
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: userEmail,
            subject: 'Email verification',
            html: `<p>Please click the following link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`,
        };

        const sentEmail = await transporter.sendMail(mailOptions);
        console.log('Verification email sent:', sentEmail.messageId, sentEmail.envelope);
    } catch (error) { 
        console.log(error);
    }
};

module.exports = { sendVerificationEmail };