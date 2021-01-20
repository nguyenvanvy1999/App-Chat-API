const express = require('express');
const router = express.Router();
const multer = require('multer');
const UserController = require('./user.controller');

module.exports = () => {
    router.use(multer().none());
    router.route('/sign-up').post(UserController.signUp);
    return router;
};