const util = require('util');
const upload = require('../config/setting/multer/index');

const singleFile = upload.single('file');
const multiFile = upload.array('files');

const singleFileHelper = util.promisify(singleFile);
const multiFileHelper = util.promisify(multiFile);

module.exports = { singleFileHelper, multiFileHelper };