const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		_id: Schema.Types.ObjectId,
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true, lowercase: true },
		password: { type: String, required: true },
		isActive: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

UserSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});
const User = mongoose.model('User', UserSchema);

module.exports = User;
