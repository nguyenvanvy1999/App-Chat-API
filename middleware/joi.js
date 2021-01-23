const { APIError } = require('../helper/error');
const JoiSchema = require('../config/setting/joi/index');

const JoiValidate = {
	user: {
		signUp: async (req, res, next) => {
			try {
				const { result, error } = JoiSchema.user.signUpSchema.validate(
					req.body
				);
				if (error)
					throw new APIError({ message: error.message, errors: error });
				next();
			} catch (error) {
				next(error);
			}
		},
		signIn: async (req, res, next) => {
			try {
				const { result, error } = JoiSchema.user.signInSchema.validate(
					req.body
				);
				if (error)
					throw new APIError({ message: error.message, errors: error });
				next();
			} catch (error) {
				next(error);
			}
		},
		token: async (req, res, next) => {
			try {
				const { result, error } = JoiSchema.user.tokenSchema.validate(req.body);
				if (error)
					throw new APIError({ message: error.message, errors: error });
				next();
			} catch (error) {
				next(error);
			}
		},
		searchUser: async (req, res, next) => {
			try {
				const { result, error } = JoiSchema.user.searchSchema.validate(
					req.body
				);
				if (error)
					throw new APIError({ message: error.message, errors: error });
				next();
			} catch (error) {
				next(error);
			}
		},
	},
};

module.exports = JoiValidate;
