const path = require('path');
const multerConfig = {
    maxSize: 1024 * 1024 * 5,
    getTime: function() {
        const today = new Date();
        const date =
            today.getDate() +
            '_' +
            (today.getMonth() + 1) +
            '_' +
            today.getFullYear();
        const time =
            today.getHours() + '_' + today.getMinutes() + '_' + today.getSeconds();
        const dateTime = date + '_' + time;
        return dateTime;
    },
    fileMime: [
        { name: 'jpg', type: 'image/jpg' },
        { name: 'png', type: 'image/png' },
        { name: 'jpeg', type: 'image/jpeg' },
        { name: 'mp4', type: 'video/mp4' },
        { name: 'avi', type: 'video/avi' },
        { name: 'mov', type: 'video/mov' },
        { name: 'flv', type: 'video/flv' },
        { name: 'wmv', type: 'video/wmv' },
    ],
    fileExt: ['.jpg', '.png', '.jpeg', '.mp4', '.mov', '.flv', '.wmv', '.avi'],
    checkFile: function(file) {
        const mime = this.fileMime.find((types) => types.type === file.mimetype);
        const ext = this.fileExt.includes(path.extname(file.originalname));
        if (mime && ext) {
            return true;
        }
        return false;
    },
};

module.exports = multerConfig;