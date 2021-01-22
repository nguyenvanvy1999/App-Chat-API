const singleFileHelper = require('../helper/multer').singleFileHelper;
const { APIError } = require('../helper/error');
const HTTP_STATUS_CODE = require('../config/constant/http');
const fs = require('fs');
async function uploadSingle(req, res, next) {
    try {
        await singleFileHelper(req, res);
        if (!req.file)
            throw new APIError({
                message: 'Please choose a file or check your file type',
            });
        res.status(HTTP_STATUS_CODE.SUCCESS.OK).send({
            message: 'Uploaded the file successfully: ' + req.file.originalname,
        });
    } catch (error) {
        next(error);
    }
}

function getListFiles(req, res, next) {
    try {
        const directoryPath =
            'C:/Users/DELL PRECISION/OneDrive/Máy tính/AppChatAPI/uploads/';
        fs.readdir(directoryPath, function(err, files) {
            if (err) throw new APIError({ message: 'Unable to scan files!' });
            let fileInfos = [];
            files.forEach((file) => {
                fileInfos.push({
                    name: file,
                    url: directoryPath + file,
                });
            });
            res.status(HTTP_STATUS_CODE.SUCCESS.OK).send(fileInfos);
        });
    } catch (error) {
        next(error);
    }
}

function download(req, res, next) {
    try {
        const fileName = req.body.name;
        const directoryPath =
            'C:/Users/DELL PRECISION/OneDrive/Máy tính/AppChatAPI/uploads/';
        if (!fs.existsSync(directoryPath + fileName))
            throw new APIError({ message: 'No such file or directory' });
        res.download(directoryPath + fileName, fileName);
    } catch (error) {
        next(error);
    }
}

module.exports = { uploadSingle, download, getListFiles };