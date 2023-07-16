const spotify = require('../../services/sdk/spotify');
const fluent = require('fluent-json-schema');

module.exports = async function (fastify, opts) {

  fastify.get('/GetIndexData', { schema: {
    // querystring : fluent.object()
    //     .prop('account', fluent.string().minLength(6).maxLength(30).required())
    //     .prop('password', fluent.string().minLength(6).maxLength(30).required())
    }
  }, async function (request, reply) {
    const parameters = request.query;
    
    const result = await spotify.search(parameters);

    const response = {
      code: "1000",
      message: "",
      data:result,
    };
    
    return reply.send(response)
  })
  
}