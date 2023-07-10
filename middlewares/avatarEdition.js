const Jimp = require('jimp');

const avatarEdition = async (path, savePath) => { 
    return Jimp.read(path)
        .then((img) => img.resize(250, 250).write(savePath))
        .catch((error) => console.log(error.message));
};

module.exports = { avatarEdition };