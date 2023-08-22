const { encryptJs } = require('../utils/utilspackage');
const config = require('config');
const secret = config.get('secret');


exports.genCode = async (data) => {
    return encryptJs.encryptAES(data,secret);
}

exports.validCode = async (hashData) => {
    return encryptJs.decryptAES(hashData,secret);
}