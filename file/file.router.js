const router = require('express').Router();
const { handleError } = require('../middleware/error');
const UploadController = require('./file.controller');
const multer = require('multer');

module.exports = () => {
	router
		.route('/upload/single')
		.post(UploadController.uploadSingle, handleError);
	router
		.route('/upload/multi')
		.post(UploadController.uploadSingle, handleError); //FIXME:fix  upload many files
	router
		.route('/list-file')
		.get(multer().none(), UploadController.getListFiles, handleError); // FIXME: add role auth here
	router
		.route('/download')
		.get(multer().none(), UploadController.download, handleError); // FIXME: add role auth here
	return router;
};
