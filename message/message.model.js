const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const MessageSchema = new Schema({
    _id: ObjectId,
    from: { type: ObjectId, ref: 'User' },
    to: { type: ObjectId, ref: 'Room' },
    type: ['Text', 'Voice', 'Link', 'File'],
    message: String,
    status: { type: Boolean, default: true },
    readAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;