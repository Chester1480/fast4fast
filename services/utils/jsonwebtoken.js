const jwt = require('jsonwebtoken');
const config = require('config');

//#region  document
//https://www.npmjs.com/package/jsonwebtoken
//#endregion

exports.exportJwtsign = async function (userData,secret="1234567") {
    const token = jwt.sign({ userData }, secret);
    return token;
}

exports.jwtverify = async function (token,secret="1234567") {
    try {
        const userData = await jwt.verify(token, secret);
        return userData;
    } catch (error) { //格式不符合 會直接報錯
        return false;
    }
}