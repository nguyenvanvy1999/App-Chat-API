const ChatService = require('./chat.service');
const HTTP_STATUS_CODE = require('../config/constant/http');
async function newChat(req, res, next) {
    try {
        const chat = ChatService.newChat(req.body);
        const newChat = await ChatService.insertChat(chat);
        console.log(newChat);
        return res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({ message: 'Success' });
    } catch (error) {
        next(error);
    }
}

module.exports = { newChat };