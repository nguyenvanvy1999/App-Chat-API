const mailConfig = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
        user: 'nguyenvanvy619619@gmail.com',
        pass: '619619vyvy',
    },
};
const mailOption = {
    subject: 'Email verify send from NodeJS server',
    text: 'Token expired at 15 minute',
};
module.exports = {
    mailConfig,
    mailOption,
};