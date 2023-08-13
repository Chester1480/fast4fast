const notion = require('../../services/sdk/notion');

module.exports = async function (fastify, opts) {

    fastify.get('/getTableData', async function (request, reply) {

        const result = await notion.retrieveDatabase('0d4b9427cb6a492f9555fa27a3da0ca2')

        return result;
    //   const { userInfo } = request;
    })
  
    // fastify.post('/ChangeScheduleSwitch', async function (request, reply) {
    //   const { jobName, status } = request.body;
    //   const { userInfo } = request;
    //   return setJobSwitch(jobName,status);
    // })
  
}