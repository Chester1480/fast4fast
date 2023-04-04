const fluent = require('fluent-json-schema');

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

    // if (password != rePassword) {
      
    // }

    return {
      statusCode: "",
      message: "",
      data:""
    }
  })
  
}
    