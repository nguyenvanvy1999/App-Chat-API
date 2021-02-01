const ChatSchema = require('../chat/chat.service');

async function saveChat(io, socket, message) {
    try {} catch (error) {
        io.to(`${socket.socketID}`).emit('Error', error);
    }
}