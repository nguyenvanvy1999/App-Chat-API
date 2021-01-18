const mongoose = require('mongoose');
const mongoConfig = require('../../constant/mongo');

// ________________________________________________

function connectMongo() {
    mongoose.Promise = global.Promise;
    mongoose.set('useFindAndModify', false);
    mongoose.connect(mongoConfig.host, mongoConfig.setting, function(err, db) {
        if (err) {
            console.log(" Can't connect successfully to db: ", mongoConfig.host);
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