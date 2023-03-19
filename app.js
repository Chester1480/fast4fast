'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')

const config = require('config');
const cpuInfo = require('os').cpus();

const schedule = require('./services/functions/schedule');
const wss = require('./services/functions/ws');

const { mongo } = require('./services/database/databasepackage');
const { dayJs } = require('./services/utils/utilspackage');
// const osLocale = require('os-locale'); //可以查看user 系統語系
const y18n = require("y18n");
const telegram = require('./services/functions/telegram');

module.exports = async function (fastify, opts) {
  // const __ = y18n({
  //   locale: 'tw',
  //   directory: './locales'
  // }).__
  
  // fastify.register(require('@fastify/cors'), {
  //   origin: '*',
  //   methods: 'GET,PUT,POST,DELETE,OPTIONS',
  //   // put your options here
  // })

  //#region 流量控制
  fastify.register(require('@fastify/rate-limit'), {
    max: 1000,
    timeWindow: 5000,
    cache: 10000,
    // allowList: ['127.0.0.1'],
    // redis: new Redis({ host: '127.0.0.1' }),
    keyGenerator: function (req) { /* ... */ },
    errorResponseBuilder: function (req, context) { /* ... */ },
    addHeaders: { // default show all the response headers when rate limit is reached
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true,
      'retry-after': true
    }
  });
  //#endregion
  
  //#region 排程
  // await schedule.OneMinuteJob();
  //#endregion

  // await wss.Start();
  // 攔截錯誤
  fastify.setErrorHandler(async (error, request, reply) => {
    // request.headers.host: 'localhost:3000',
    if (error) {
      // const today_YMD_Format = await dayJs.GetToday_YMD_Format();
      // const today_YMDhms_Format = await dayJs.GetToday_YMDhms_Format();
      // const errorData = {
      //   route: request.url,
      //   method: request.method,
      //   message: error,
      //   dateTime:today_YMDhms_Format
      // }
      // await mongo.insert(today_YMD_Format,errorData);
      // console.log(request) //debug才開啟這行
      return error;
    }
  });

  

  // await fastify.register(require('@fastify/swagger'), {
  //   swagger: {
  //     info: {
  //       title: 'Test swagger',
  //       description: 'Testing the Fastify swagger API',
  //       version: '0.1.0'
  //     },
  //     externalDocs: {
  //       url: 'https://swagger.io',
  //       description: 'Find more info here'
  //     },
  //     host: 'localhost',
  //     schemes: ['http'],
  //     consumes: ['application/json'],
  //     produces: ['application/json'],
  //     tags: [
  //       { name: 'user', description: 'User related end-points' },
  //       { name: 'code', description: 'Code related end-points' }
  //     ],
  //     definitions: {
  //       User: {
  //         type: 'object',
  //         required: ['id', 'email'],
  //         properties: {
  //           id: { type: 'string', format: 'uuid' },
  //           firstName: { type: 'string' },
  //           lastName: { type: 'string' },
  //           email: {type: 'string', format: 'email' }
  //         }
  //       }
  //     },
  //     securityDefinitions: {
  //       apiKey: {
  //         type: 'apiKey',
  //         name: 'apiKey',
  //         in: 'header'
  //       }
  //     }
  //   }
  // })
  
  // await fastify.ready()
  // fastify.swagger()


  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  
  fastify.addHook('onRequest', async (req, reply) => {
    console.log(req);
    //url
    //method 
    
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
  
}
