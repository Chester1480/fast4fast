const { getJobSwitch , setJobSwitch } = require('../../services/functions/schedule');

module.exports = async function (fastify, opts) {

  fastify.get('/GetScheduleSwitch', async function (request, reply) {
    const { userInfo } = request;
    return getJobSwitch();
  })

  fastify.post('/ChangeScheduleSwitch', async function (request, reply) {
    const { jobName, status } = request.body;
    const { userInfo } = request;
    return setJobSwitch(jobName,status);
  })

}