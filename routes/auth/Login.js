
module.exports = async function (fastify, opts) {

  fastify.post('/AccountLogin', async function (request, reply) {
    return 'AccountLogin'
  })

  fastify.post('/GoogleOuath2Login', async function (request, reply) {
    //if not register do register
    
    return 'GoogleOuath2'
  })
  
}
  