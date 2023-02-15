
module.exports = async function (fastify, opts) {
  fastify.get('/test', async function (request, reply) {
    return '1'
  })
}
  