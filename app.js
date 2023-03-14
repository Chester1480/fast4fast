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


module.exports = async function (fastify, opts) {
  
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


  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
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
