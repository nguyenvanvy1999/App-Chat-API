const express = require('express');
const router = express.Router();
const multer = require('multer');
const UserController = require('./user.controller');
const handleError = require('../middleware/error').handleError;
const JoiValidate = require('../middleware/joi');
const UserMiddleware = require('../middleware/user');
const JwtMiddleware = require('../middleware/jwt');

module.exports = () => {
	router.use(multer().none());
	router
		.route('/sign-up')
		.post(
			JoiValidate.user.signUp,
			UserMiddleware.checkDuplicateEmail,
			UserController.signUp,
			handleError
		);
	router
		.route('/verify')
		.get(JoiValidate.user.token, UserController.verifyAccount, handleError);
	router
		.route('/search')
		.get(
			JoiValidate.user.searchUser,
			JwtMiddleware.isAuth,
			UserController.findUser,
			handleError
		); //NOTE:add validate here
	router
		.route('/sign-in')
		.get(JoiValidate.user.signIn, UserController.signIn, handleError);
	router
		.route('/profile')
		.get(
			JoiValidate.user.token,
			JwtMiddleware.isAuth,
			UserController.userProfile,
			handleError
		); //NOTE:add validate here
	return router;
};
