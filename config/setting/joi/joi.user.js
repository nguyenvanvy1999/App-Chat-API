const joi = require('joi');
const joiConfig = require('../../constant/joi');

const joiSchema = {
    user: {
        signUpSchema: joi.object({
            email: joiConfig.user.email,
            username: joiConfig.user.username,
            password: joiConfig.user.password,
        }),
        signInSchema: joi.object({
            email: joiConfig.user.email,
            password: joiConfig.user.password,
        }),
        editUserSchema: joi.object({
            token: joiConfig.user.token,
            newUsername: joiConfig.user.username,
            newPassword: joiConfig.user.password,
        }),
        tokenSchema: joi.object({
            token: joiConfig.user.token,
        }),
    },
};

module.exports = joiSchema;