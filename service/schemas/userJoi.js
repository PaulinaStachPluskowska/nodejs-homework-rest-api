const Joi = require('joi');

const userSignInSchema = Joi.object({
    password: Joi.string().min(6).pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ).required(),
    email: Joi.string().email().required(),
});

const userSignUpSchema = Joi.object({
    password: Joi.string().min(6).pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ).required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().valid('starter', 'pro', 'business'),
});

const userUpdateSchema = Joi.object({
    password: Joi.string().min(6).pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ).required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().valid('starter', 'pro', 'business'), 
}).or('password', 'email', 'subscription');

module.exports = { userSignInSchema, userSignUpSchema, userUpdateSchema };