const jwtConfig = require('../config/constant/jwt');
const jwt = require('jsonwebtoken');

async function generateToken(user, secretSignature, tokenLife) {
    try {
        const userData = {
            _id: user._id,
            email: user.email,
            username: user.username,
        };
        const token = await jwt.sign({ data: userData }, secretSignature, {
            algorithm: 'HS256',
            expiresIn: tokenLife,
        });
        return token;
    } catch (error) {
        return error;
    }
}
async function verifyToken(token, secretKey) {
    try {
        const decoded = await jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return error;
    }
}

async function returnToken(user) {
    try {
        const accessToken = await generateToken(
            user,
            jwtConfig.ACCESS.SECRET,
            jwtConfig.ACCESS.LIFE
        );
        const refreshToken = await generateToken(
            user,
            jwtConfig.REFRESH.SECRET,
            jwtConfig.REFRESH.LIFE
        );
        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    } catch (error) {
        return error;
    }
}

module.exports = { returnToken, verifyToken, generateToken };