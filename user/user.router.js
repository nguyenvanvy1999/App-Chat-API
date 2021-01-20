const express = require('express');
const router = express.Router();
const multer = require('multer');
const UserController = require('./user.controller');
const handleError = require('../middleware/error').handleError;

module.exports = () => {
    router.use(multer().none());
    router.route('/sign-up').post(UserController.signUp, handleError);
    router.route('/verify').get(UserController.verifyAccount, handleError);
    router.route('/search/user?').get(UserController.findUser, handleError);
    router.route('/sign-in').get(UserController.signIn, handleError);
    return router;
};