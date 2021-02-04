const JwtConfig = require('../config/constant/jwt');
const JwtHelper = require('../helper/jwt');
const { APIError } = require('../helper/error');

async function isAuth(req, res, next) {
    try {
        const token = req.body.token || req.query.token || req.header['token'];
        const decoded = await JwtHelper.verifyToken(token, JwtConfig.ACCESS.SECRET);
        req.jwtDecoded = decoded;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = { isAuth };