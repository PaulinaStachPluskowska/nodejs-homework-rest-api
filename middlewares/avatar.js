const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const avatarDir = path.join(process.cwd(), 'public', 'avatars');
const tmpDir = path.join(process.cwd(), 'tmp');

const storage = multer.diskStorage({
    destination: (req, file, cb) => { 
        cb(null, tmpDir);
    },
    filename: (req, file, cb) => { 
        const suffix = uuidv4().toString();
        const name = [suffix, file.originalname].join('_');
        cb(null, name);
    },
    limits: {
        fileSize: 1048576
    },
}); 

const upload = multer({
    storage: storage,
});

module.exports = { upload, avatarDir, tmpDir };