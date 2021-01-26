const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ChatSchema = new Schema({
    _id: ObjectId,
    name: { type: String, lowercase: true, unique: true },
    description: String,
    isPrivate: { type: Boolean, default: true },
    users: [{
        user: { type: ObjectId, ref: 'User' },
        status: { type: Boolean, default: false },
        role: { value: ['Member', 'Owner'] },
    }, ],
    messages: [{
        message: {
            _id: ObjectId,
            from: { type: ObjectId, ref: 'User' },
            type: ['Text', 'Link', 'File', 'Voice'],
            body: String,
            sendAt: { type: Date, default: Date.now },
            status: { type: Boolean, default: false },
            readAt: Date,
        },
    }, ],
    lastActive: { type: Date, default: Date.now },
    messageCount: Number,
}, { timestamps: true });

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;