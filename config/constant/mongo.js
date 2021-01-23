const MongoConfig = {
	host: 'mongodb://localhost:27017/AppChat',
	setting: {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
};
module.exports = MongoConfig;
