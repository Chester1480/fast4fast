'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const NODE_ENV = process.env.NODE_ENV;

const config = require('config');
const originIp = config.get('originIp');
const cpuInfo = require('os').cpus();

const wss = require('./services/functions/ws');

const { mongo } = require('./services/database/databasepackage');
const { dayJs } = require('./services/utils/utilspackage');
// const osLocale = require('os-locale'); //可以查看user 系統語系
const y18n = require("y18n");

//機器人服務類
//const telegram = require('./services/functions/telegram');
//const discord = require('./services/functions/discord');

//#region 排程
// const schedule = require('./services/functions/schedule');
// schedule.excute();
//#endregion
module.exports = async function (fastify, opts) {
  // const __ = y18n({
  //   locale: 'tw',
  //   directory: './locales'
  // }).__
  
  fastify.register(require('@fastify/cors'), {
    origin: originIp,
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    // put your options here
  })

  //#region 流量控制
  fastify.register(require('@fastify/rate-limit'), {
    max: 1000,
    timeWindow: 5000,
    cache: 10000,
    allowList: ['127.0.0.1'],
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

  fastify.register(require('@fastify/swagger'), {
    swagger: {
      info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0'
      },
      schemes: ["http", "https"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [{ name: "Default", description: "Default" }],
    }
  })

  fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: "/docs",
    exposeRoute: true,
  })

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  const routeranalyze = require('./services/functions/routeranalyze');
  //每次 call api都會經過 像middleware一樣
  fastify.addHook('onRequest', async (req, reply) => {

    const { url, method, query, body, raw } = req;
    const { authorization, host } = req.headers;

    if (url !== "" ) {
      const route = url.split('/')[1];

      //#region
      const parameters = {
        routerPrefix:route,//網址
        ip:req.socket.remoteAddress,//client ip
        host,//主機domain
        authorization,//hearder authorization
        url, 
        method,
        query,
        body,
        raw,
        route
      }
      
      //每次 request 都需要處理
      const result = await routeranalyze.strategies(parameters)
      if (result.statusCode != 200) {
        return reply.send(result);
      }
     
    }

    
    
  });

  //註冊差件
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  //註冊API路由
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  console.log("website ready "+ new Date())

}
