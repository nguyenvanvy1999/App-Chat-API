const multer = require('multer');
const multerConfig = require('../../constant/multer');
const fileFilter = function(req, file, cb) {
    if (multerConfig.checkFile(file)) cb(null, true);
    cb(null, false);
};

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, multerConfig.getTime() + '-' + file.originalname);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: multerConfig.maxSize,
    },
    fileFilter: fileFilter,
});
module.exports = upload;