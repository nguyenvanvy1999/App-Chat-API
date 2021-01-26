const express = require('express');
const router = express.Router();
const multer = require('multer');
const handleError = require('../middleware/error').handleError;
const ChatController = require('./chat.controller');

module.exports = () => {
    router.use(multer().none());
    router.route('/new-chat').post(ChatController.newChat, handleError);
    return router;
};