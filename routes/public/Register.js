const fluent = require('fluent-json-schema');
const { mongo } = require('../../services/database/databasepackage');
const { encryptJs } = require('../../services/utils/utilspackage');
const { getStatusCode } = require('../../services/share/model');

const config = require('config');
const passwordSecret = config.get('passwordSecret');

module.exports = async function (fastify, opts) {

  const accountRegisterVerify = {
    body : fluent.object()
    .prop('account', fluent.string().minLength(6).maxLength(30).required())
    .prop('password', fluent.string().minLength(6).maxLength(30).required())
    .prop('rePassword', fluent.string().minLength(6).maxLength(30).required())
    .prop('email', fluent.string().minLength(6).maxLength(30).required())
    .prop('phoneNumber', fluent.string().minLength(6).maxLength(30).required())
  }
  
  fastify.post('/AccountRegister', { schema: accountRegisterVerify}, async function (request, reply){
    const {
      account,
      password,
      rePassword,
      name,
      birthday,
      gender,
      email,
      phoneNumber,
    } = request.body;

    const isExist = await mongo.find("UserData", { account });

    if (isExist) {
      return {
        statusCode: "400",
        message: "rePassword_is_not_same",
        data:""
      }
    }

    if (password != rePassword) {
      return {
        statusCode: "400",
        message: "rePassword_is_not_same",
        data:""
      }
    }

    const bcryptHashPassword = await encryptJs.bcryptHash(password, passwordSecret);

    const data = {
      avatar,
      account,
      password: bcryptHashPassword,
      name,
      birthday,
      gender,
      email,
      phoneNumber,
      type: "n",
      registerIp:"" ,
      registerDate: Date.now(),
    }
    const result = await mongo.insert("UserData", [data]);

    //註冊成功直接登入或是導向登入頁
    return {
      statusCode: "200",
      message: "register success",
      data:""
    }
  })
  
}
    