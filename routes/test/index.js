const config = require('config');

module.exports = async function (fastify, opts) {

  const environment = config.get('environment');
  // if (environment != 'prod') { //產生測試環境用資料
    
  // }

    fastify.get('/', async function (request, reply) {
        return 'test get'
    })
    fastify.post('/', async function (request, reply) {
        return 'test post'
    })
}
    