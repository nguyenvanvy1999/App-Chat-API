const ChatService = require('./chat.service');
const HTTP_STATUS_CODE = require('../config/constant/http');
const JwtHelper = require('../helper/jwt');
async function newChat(req, res, next) {
    try {
        const chat = ChatService.newChat(req.body);
        const newChat = await ChatService.insertChat(chat);
        const token = await JwtHelper.tokenChat(newChat);
        return res
            .status(HTTP_STATUS_CODE.SUCCESS.OK)
            .send({ message: 'Success', token: token }); //FIXME:return token chat here
    } catch (error) {
        next(error);
    }
}

async function newMessage(user, message) {
    try {
        const newMessage = ChatService.newMessage(user, message);
        const result = await ChatService.insertMessage(newMessage);
        return result;
    } catch (error) {
        next(error);
    }
}

module.exports = { newChat, newMessage };