'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const NODE_ENV = process.env.NODE_ENV;
    return {
      root: true,
      NODE_ENV,
    }
  })
}
