const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().min(3).max(30).pattern(
        /^([A-Z]+'?[a-z]+|[A-Z][a-z]+'?[a-z]+) ([A-Z]+'?[a-z]+|[A-Z][a-z]+'?[a-z]+)$/
    ).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(7).max(13).pattern(
        /^([+][0-9]{0,4})?[\s]?([(][0-9]{1,3}[)])?[\s]?[0-9]{2,3}[-\s]?[0-9]{2,3}[-\s]?[0-9]{2,4}$/
    ).messages({
        "string.pattern.base": `Phone number must have at least 7 digits.`,
      }).required(),
    favorite: Joi.boolean(),
});

const updateSchema = Joi.object({
    name: Joi.string().min(3).max(30).pattern(
        /^([A-Z]+'?[a-z]+|[A-Z][a-z]+'?[a-z]+) ([A-Z]+'?[a-z]+|[A-Z][a-z]+'?[a-z]+)$/
    ).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(7).max(13).pattern(
        /^([+][0-9]{0,4})?[\s]?([(][0-9]{1,3}[)])?[\s]?[0-9]{2,3}[-\s]?[0-9]{2,3}[-\s]?[0-9]{2,4}$/
    ).messages({
        "string.pattern.base": `Phone number must have at least 7 digits.`,
      }).required(),
    favorite: Joi.boolean(),
}).or('name', 'email', 'phone', 'favorite');

module.exports = { schema, updateSchema, };