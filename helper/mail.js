const nodeMailer = require('nodemailer');
const mailConfig = require('../config/constant/mail').mailConfig;
const mailOption = require('../config/constant/mail').mailOption;
const { APIError } = require('../helper/error');

function newMailOption(to, text) {
    const newOption = {
        from: mailConfig.auth.user,
        to: to,
        subject: mailOption.subject,
        text: mailOption.text + text + mailOption.text2,
    };
    return newOption;
}

async function sendMail(mailOption) {
    try {
        const transporter = nodeMailer.createTransport(mailConfig);
        const mail = await transporter.sendMail(mailOption);
        return mail;
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

module.exports = { newMailOption, sendMail };