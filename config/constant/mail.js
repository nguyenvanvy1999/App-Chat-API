const MailConfig = {
	service: 'gmail',
	auth: {
		user: '619619vyvy@gmail.com',
		pass: '619vy619vy',
	},
};
const MailOption = {
	subject: 'Email verify send from NodeJS server',
	text:
		'You was this email to signup in AppChat. This mail to verify your account.\n Token expired at 15 minute. This is your token:  \n',
	text2: '\n Go to: http://localhost:8080/user/verify  to active your account',
};
module.exports = {
	MailConfig,
	MailOption,
};
