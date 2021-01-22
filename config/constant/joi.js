const joi = require('joi');

const joiConfig = {
    user: {
        email: joi
            .string()
            .email({ minDomainSegments: 2, tlds: { allow: ['vn', 'com', 'net'] } })
            .required(),
        username: joi.string().alphanum().min(4).max(20).required(),
        password: joi
            .string()
            .regex(/^[a-zA-Z0-9]{3,30}$/)
            .min(4)
            .required(),
        role: joi.string().valid('Admin', 'User'),
        token: joi
            .string()
            .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
            .required(),
    },
};

module.exports = joiConfig;