const joi = require('joi');
const JoiConfig = require('../../constant/joi');

const JoiSchema = {
	user: {
		signUpSchema: joi.object({
			email: JoiConfig.user.email.required(),
			username: JoiConfig.user.username.required(),
			password: JoiConfig.user.password.required(),
		}),
		signInSchema: joi.object({
			email: JoiConfig.user.email.required(),
			password: JoiConfig.user.password.required(),
		}),
		editUserSchema: joi.object({
			token: JoiConfig.user.token.required(),
			newUsername: JoiConfig.user.username.required(),
			newPassword: JoiConfig.user.password.required(),
		}),
		tokenSchema: joi.object({
			token: JoiConfig.user.token.required(),
		}),
		searchSchema: joi
			.object({
				token: JoiConfig.user.token.required(),
				email: JoiConfig.user.email,
				username: JoiConfig.user.username,
				id: JoiConfig.user.id,
			})
			.or('email', 'username', 'id'),
	},
};

module.exports = JoiSchema;
