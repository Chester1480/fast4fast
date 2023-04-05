const fluent = require('fluent-json-schema');
const { mongo } = require('../../services/database/databasepackage');
const { encryptJs } = require('../../services/utils/utilspackage');

const config = require('config');
const passwordSecret = config.get('passwordSecret');
const jwtSecret = config.get('jwtSecret');
const jwt = require('jsonwebtoken');

module.exports = async function (fastify, opts) {


  const accountLoginVerify = {
    body : fluent.object()
    .prop('account', fluent.string().minLength(6).maxLength(30).required())
    .prop('password', fluent.string().minLength(6).maxLength(30).required())
  }

  fastify.post('/AccountLogin', { schema: accountLoginVerify}, async function (request, reply) {
    const { account, password } = request.body;
    const userInfo = mongo.find("UserInfo", account);
    
    //查詢帳號是否存在
    if (!userInfo) {
      return {
        statusCOde: "400",
        message: "account is not exist or password is wrong..",
        data:""
      }
    }

    //比對密碼
    const bcryptHashPassword = encryptJs.bcryptHash(password, passwordSecret)
    const isCompare = encryptJs.bcrypCompareSync(bcryptHashPassword,userInfo.password)
    
    if (!isCompare) {
      return {
        statusCOde: "400",
        message: "account is not exist or password is wrong.",
        data:""
      }
    }

    const userData = {
      id: userInfo._id,
      account: userInfo.account,
      email: userInfo.email,
      email: userInfo.email,
    }

    var token = jwt.sign(userData, jwtSecret);
    return {
      statusCOde: "200",
        message: "success",
        data: {
          token
        }
    }

  })

  fastify.post('/GoogleOuath2Login', async function (request, reply) {
    //if not register do register
    
    return 'GoogleOuath2'
  })
  
}
  