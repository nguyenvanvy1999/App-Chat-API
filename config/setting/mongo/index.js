const mongoose = require('mongoose');
const MongoConfig = require('../../constant/mongo');

// ________________________________________________

function connectMongo() {
	mongoose.Promise = global.Promise;
	mongoose.set('useFindAndModify', false);
	mongoose.connect(MongoConfig.host, MongoConfig.setting, function (err, db) {
		if (err) {
			console.log(" Can't connect successfully to db: ", MongoConfig.host);
			return;
		} else {
			console.log(
				'connect successfully to db: ',
				db.connection._connectionString
			);
		}
	});
}

module.exports = {
	connectMongo,
};
