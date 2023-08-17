const notion = require('../../services/sdk/notion');

module.exports = async function (fastify, opts) {

    fastify.get('/getTableData', async function (request, reply) {

        const result = await notion.queryDatabase('1fbd6b7ec6a74e54a335d8fb5381e1cb')

        return result;
    //   const { userInfo } = request;
    })
  
    // fastify.post('/ChangeScheduleSwitch', async function (request, reply) {
    //   const { jobName, status } = request.body;
    //   const { userInfo } = request;
    //   return setJobSwitch(jobName,status);
    // })
  
}