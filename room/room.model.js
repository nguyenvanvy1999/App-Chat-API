const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const RoomSchema = new Schema({
    _id: ObjectId,
    name: { type: String, lowercase: true, unique: true },
    description: String,
    users: [{
        user: { type: ObjectId, ref: 'User' },
        status: { type: Boolean, default: false },
    }, ],
    lastActive: { type: Date, default: Date.now },
    messageCount: Number,
}, { timestamps: true });

const Room = mongoose.model('Room', RoomSchema);
module.exports = Room;