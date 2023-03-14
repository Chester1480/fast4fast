
module.exports = async function (fastify, opts) {
  fastify.get('/test', async function (request, reply) {
    const test = "123";
    test = "568";
    return '1'
  })
}
  