const fluent = require('fluent-json-schema');
const { mongo } = require('../../services/database/databasepackage');
const { encryptJs } = require('../../services/utils/utilspackage');

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
      email,
      phoneNumber,
    } = request.body;

    if (password != rePassword) {
      return {
        statusCode: "400",
        message: "password and rePassword is not same",
        data:""
      }
    }

    const bcryptHashPassword = await encryptJs.bcryptHash(password, passwordSecret);

    const data = {
      account,
      password:bcryptHashPassword,
      email,
      phoneNumber,
    }
    const result = mongo.insert("UserData", [data]);
    
    //註冊成功直接登入或是導向登入頁
    return {
      statusCode: "200",
      message: "register success",
      data:""
    }
  })
  
}
    