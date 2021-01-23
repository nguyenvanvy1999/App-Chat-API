const multer = require('multer');
const MulterConfig = require('../../constant/multer');
const fileFilter = function (req, file, cb) {
	if (MulterConfig.checkFile(file)) cb(null, true);
	cb(null, false);
};

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, MulterConfig.getTime() + '-' + file.originalname);
	},
});

const upload = multer({
	storage: storage,
	limits: {
		fileSize: MulterConfig.maxSize,
	},
	fileFilter: fileFilter,
});
module.exports = upload;
