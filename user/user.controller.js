const UserService = require('./user.service');
const HTTP_STATUS_CODE = require('../config/constant/http');
const jwtConfig = require('../config/constant/jwt');
const jwtHelper = require('../helper/jwt');
const mailHelper = require('../helper/mail');
const bcryptHelper = require('../helper/bcrypt');
const { APIError } = require('../helper/error');
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
        res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({
            message: 'Check your email and verify account!',
            result: result,
        });
    } catch (error) {
        next(error);
    }
}
async function signIn(req, res, next) {
    try {
        const user = await UserService.searchUser(req.body);
        if (!user) throw new APIError({ message: 'Email wrong !' });
        const isPassword = await bcryptHelper.compare(
            req.body.password,
            user.password
        );
        if (!isPassword) throw new APIError({ message: 'Password wrong !' });
        if (!user.isActive)
            throw new APIError({ message: 'Account is not activated ' });
        const token = await jwtHelper.returnToken(user);
        res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({
            message: 'Verify Successfully',
            result: token,
        });
    } catch (error) {
        next(error);
    }
}

async function verifyAccount(req, res, next) {
    try {
        const token = req.body.token || req.query.token || req.header['token'];
        const decoded = await jwtHelper.verifyToken(token, jwtConfig.VERIFY.SECRET);
        const result = await UserService.activeAccount(decoded.data.email);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({
            message: 'Active successfully !.Now you can using out function',
            result: result,
        });
    } catch (error) {
        next(error);
    }
}
async function userProfile(req, res, next) {
    try {
        const user = await UserService.searchUser(req.params);
        if (!user) throw new APIError({ message: 'No user found!' });
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({
            result: user,
        });
    } catch (error) {
        next(error);
    }
}

async function findUser(req, res, next) {
    try {
        const result = await UserService.searchUser(req.query);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({ result: result });
    } catch (error) {
        next(error);
    }
}
module.exports = { signUp, verifyAccount, findUser, signIn, userProfile };