const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const mongo = require('./config/setting/mongo/index');
const morgan = require('morgan');
const ServerConfig = require('./config/constant/server');
const UserRouter = require('./user/user.router')();
// ________________________________________________
mongo.connectMongo();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
// ________________________________________________
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin,X-Requested-With,Content-Type,Accept,Authorization'
	);
	if (req.method === 'OPTIONS') {
		req.headers('Access-Control-Allow-Methods', 'PUT,POST,PATH,DELETE,GET');
		return res.status(200).json({});
	}
	next();
});
// ________________________________________________
app.use('/user', UserRouter);
// ________________________________________________
server.listen(ServerConfig.port, ServerConfig.host, () => {
	console.log(
		'server on: http://' +
			server.address().address +
			':' +
			server.address().port
	);
});
