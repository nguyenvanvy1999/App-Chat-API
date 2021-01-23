const UserService = require('../user/user.service');
const { APIError } = require('../helper/error');
async function checkDuplicateEmail(req, res, next) {
	try {
		const user = await UserService.searchUser(req.body);
		if (user) throw new APIError({ message: 'The email has been exits' });
		next();
	} catch (error) {
		next(error);
	}
}

module.exports = { checkDuplicateEmail };
