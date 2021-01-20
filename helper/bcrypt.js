const bcrypt = require('bcrypt');
const { APIError } = require('./error');

async function hash(password, saltRounds) {
    try {
        const result = await bcrypt.hash(password, saltRounds);
        return result;
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
async function compare(password, hash) {
    try {
        const result = await bcrypt.compare(password, hash);
        return result;
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

module.exports = { hash, compare };