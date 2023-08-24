const fluent = require('fluent-json-schema');
const { mongo } = require('../../services/database/databasepackage');
const { encryptJs } = require('../../services/utils/utilspackage');
const { getStatusCode ,getTextCode } = require('../../services/ShareModule/model');

const config = require('config');
const passwordSecret = config.get('passwordSecret');

module.exports = async function (fastify, opts) {

  const gender = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    OTHER: 'OTHER',
  }

  const accountRegisterVerify = {
    body : fluent.object()
      .prop('account', fluent.string().minLength(6).maxLength(30).required())
      .prop('password', fluent.string().minLength(6).maxLength(30).required())
      .prop('address', fluent.string().minLength(6).maxLength(100).required())
      .prop('nickname', fluent.string().minLength(1).maxLength(30).required())
      .prop('birthday', fluent.string().format(fluent.FORMATS.DATE).required())
      .prop('gender',  fluent.string().enum(Object.values(gender)).required())
      .prop('email', fluent.string().format(fluent.FORMATS.EMAIL).required())
      // .prop('phoneNumber', fluent.string().minLength(6).maxLength(30).required())
  }
  
  fastify.post('/AccountRegister', { schema: accountRegisterVerify }, async function (request, reply) {
    const {
      account,
      password,
      rePassword,
      address,
      nickname,
      birthday,
      gender,
      email,
      // phoneNumber,
    } = request.body;

    if (account == password) {
      return {
        statusCode: 400,
        message: getTextCode("1009"),
        data:[]
      }
    }

    if (password != rePassword) {
      return {
        statusCode: 400,
        message: getTextCode("1006"),
        data:[]
      }
    }

    const isExist = await mongo.find("UserData", { account });

    if (isExist.length >0) {
      return {
        statusCode: 400,
        message: getTextCode("1007"),
        data:[]
      }
    }

    const bcryptHashPassword = await encryptJs.bcryptHash(password, passwordSecret);

    const data = {
      avatar,
      account,
      password: bcryptHashPassword,
      contryCode:"",
      active: 1,
      address,
      nickname,
      birthday,
      gender,
      email,
      // phoneNumber,
      lastLoginTme: null,
      lastLogIp:  null,
      register: {
        registerIp: request.raw.client._peername.address,
        registerDate: Date.now(),
      },
      premiumExpiredTime: null,
      validCode: ""
    }
    
    const result = await mongo.insert("UserData", [data]);

    //sendEnail or sms

    //註冊成功直接登入或是導向登入頁
    return {
      statusCode: 200,
      message: getLangCode("1008"),
      data:[]
    }
  })

  fastify.post('/ValidRegisterByEmail', async function (request, reply) { 
    const { } = request.query
  })

  fastify.post('/ValidRegisterByPhone', async function (request, reply) { 
    const { } = request.query
  })

  fastify.get('/ValidRegisterUrl', async function (request, reply) { 
    const { } = request.query
  })
  
}
    