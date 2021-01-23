const Joi = require('joi');
const jsonwebtoken = require('jsonwebtoken');

const joiOID = Joi.extend({
    type: 'objectId',
    messages: {
        invalid: 'It must have a valid ObjectId',
    },
    validate(value, helpers) {
        const objIdPattern = /^[0-9a-fA-F]{24}$/;
        const isValid = (value) => {
            return (
                Boolean(value) &&
                !Array.isArray(value) &&
                objIdPattern.test(String(value))
            );
        };
        if (!isValid(value)) return { value, errors: helpers.error('invalid') };
    },
});

const joiJWT = Joi.extend({
    type: 'jwt',
    messages: {
        invalid: 'It must have a valid JWT',
    },
    validate(value, helpers) {
        const jwtPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/;
        if (!jwtPattern.test(String(value)))
            return { value, errors: helpers.error('invalid') };
        const decoded = jsonwebtoken.decode(value);
        if (!decoded) return { value, errors: helpers.error('invalid') };
    },
});

module.exports = { joiOID, joiJWT };