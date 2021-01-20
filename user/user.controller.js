const UserService = require('./user.service');
const HTTP_STATUS_CODE = require('../config/constant/http');
const jwtHelper = require('../helper/jwt');
const jwtConfig = require('../config/constant/jwt');
const mailHelper = require('../helper/mail');
async function signUp(req, res, next) {
    try {
        const user = UserService.newUser(req.body);
        const token = await jwtHelper.generateToken(
            user,
            jwtConfig.VERIFY.SECRET,
            jwtConfig.VERIFY.LIFE
        );
        const newMail = mailHelper.newMailOption(user.email, token);
        const result = await mailHelper.sendMail(newMail);
        await UserService.insert(user);
        res
            .status(HTTP_STATUS_CODE.SUCCESS.OK)
            .send({ message: 'Check your email and verify account!' });
    } catch (error) {
        next(error);
    }
}

async function verifyAccount(req, res, next) {
    try {
        const token = req.body.token || req.query.token || req.header['token'];
        let decoded = await jwtHelper.verifyToken(token, jwtConfig.VERIFY.SECRET);
        let result = await UserService.activeAccount(decoded.data.email);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({
            message: 'Active successfully !.Now you can using out function',
            result,
        });
    } catch (error) {
        next(error);
    }
}
module.exports = { signUp, verifyAccount };