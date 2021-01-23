const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    _id: Schema.Types.ObjectId,
    from: { type: Schema.Types.ObjectId, ref: 'User' },
    to: { type: Schema.Types.ObjectId, ref: 'User' },
    properties: {
        type: ['String', 'VoiceChat', 'File'],
        content: String,
        sendAt: { type: Date, default: Date.now },
        idRead: { type: Boolean, default: false },
        readAt: { type: Date, default: Date.now },
    },
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;