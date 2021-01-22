const joiConfig = require('../config/constant/joi');
const { APIError } = require('../helper/error');
const joiSchema = require('../config/setting/joi/joi.user');
async function joiSignUp(req, res, next) {
    try {
        const { result, error } = joiSchema.user.signUpSchema.validate(req.body);
        if (error) throw new APIError({ message: error.message, errors: error });
        next();
    } catch (error) {
        next(error);
    }
}
async function joiSignIn(req, res, next) {
    try {
        const { result, error } = joiSchema.user.signInSchema.validate(req.body);
        if (error) throw new APIError({ message: error.message, errors: error });
        next();
    } catch (error) {
        next(error);
    }
}
async function joiToken(req, res, next) {
    try {
        const { result, error } = joiSchema.user.tokenSchema.validate(req.body);
        if (error) throw new APIError({ message: error.message, errors: error });
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = { joiSignUp, joiSignIn, joiToken };