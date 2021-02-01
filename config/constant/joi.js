const joi = require('joi');
const custom = require('../setting/joi/custom');
const JoiConfig = {
    user: {
        email: joi
            .string()
            .email({ minDomainSegments: 2, tlds: { allow: ['vn', 'com', 'net'] } }),
        username: joi.string().alphanum().min(4).max(20),
        password: joi
            .string()
            .regex(/^[a-zA-Z0-9]{3,30}$/)
            .min(4), //FIXME: none !@#
        role: joi.string().valid('Admin', 'User'),
        token: custom.joiJWT.jwt(),
        id: custom.joiOID.objectId(),
    },
    chat: {
        _id: custom.joiOID.objectId(),
        name: joi.string().required(),
        description: joi.string(),
        isPrivate: joi.boolean(),
        message: joi.string(),
    },
};

module.exports = JoiConfig;