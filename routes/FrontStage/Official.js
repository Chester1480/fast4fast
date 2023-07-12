
module.exports = async function (fastify, opts) {

  fastify.get('/GetBoard', async function (request, reply) {
    const { userInfo } = request;
    return getJobSwitch();
  })
    
  fastify.get('/GetIndexData', async function (request, reply) {
    const { userInfo } = request;
    return getJobSwitch();
  })

    //   fastify.post('/ChangeScheduleSwitch', async function (request, reply) {
    //     const { jobName, status } = request.body;
    //     const { userInfo } = request;
    //     return setJobSwitch(jobName,status);
    //   })

}