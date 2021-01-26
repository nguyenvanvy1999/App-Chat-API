const Chat = require('./chat.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId();
const { APIError } = require('../helper/error');

function newChat(room) {
    try {
        const newChat = {
            _id: ObjectId,
            name: room.name,
            description: room.description || null,
            isPrivate: room.isPrivate,
            users: [room.users],
            messages: [],
            lastActive: Date.now(),
            messageCount: 0,
        };
        return newChat;
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}

async function insertChat(newChat) {
    try {
        const chat = new Chat(newChat);
        const result = await chat.save();
        return result;
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
async function newMessage(message) {
    try {
        const newMessage = {
            _id: ObjectId,
            from: message.user,
            type: message.type,
            body: message.body,
            sendAt: message.sendAt || Date.now(),
            status: false,
            readAt: null,
        };
        return newMessage;
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
async function searchChat(chat) {
    try {
        let result;
        if (chat === null) result = await Chat.find();
        const { name, _id, users } = chat;
        if (name || id)
            result = await Chat.findOne({ $or: [{ name: name }, { _id: _id }] });
        result = await Chat.find({ users: { $in: users } });
        if (result.length === 0) return null;
        if (result.length === 1) return result[0];
        return result;
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
async function insertMessage(newMessage, chat) {
    try {
        const chatInfo = await searchChat(chat);
        const result = await Chat.findByIdAndUpdate({ _id: chatInfo._id }, { $push: { messages: newMessage } });
        return result;
    } catch (error) {
        throw new APIError({ message: error.message, errors: error });
    }
}
module.exports = { newChat, insertChat, newMessage, insertMessage };