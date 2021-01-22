const express = require('express');
const router = express.Router();
const multer = require('multer');
const UserController = require('./user.controller');
const handleError = require('../middleware/error').handleError;
const UserValidate = require('../middleware/joi');

module.exports = () => {
    router.use(multer().none());
    router
        .route('/sign-up')
        .post(UserValidate.joiSignUp, UserController.signUp, handleError);
    router
        .route('/verify')
        .get(UserValidate.joiToken, UserController.verifyAccount, handleError);
    router.route('/search/user?').get(UserController.findUser, handleError); //NOTE:add validate here
    router
        .route('/sign-in')
        .get(UserValidate.joiSignIn, UserController.signIn, handleError);
    router.route('/:id').get(UserController.userProfile, handleError); //NOTE:add validate here
    return router;
};