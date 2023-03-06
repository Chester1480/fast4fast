'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')

const config = require('config');
const cpuInfo = require('os').cpus();

const schedule = require('./services/functions/schedule');

// const osLocale = require('os-locale'); //可以查看user 系統語系


module.exports = async function (fastify, opts) {
  
  // await schedule.OneMinuteJob();

  // 攔截錯誤
  fastify.setErrorHandler(async (error, request, reply) => {
    // request.headers.host: 'localhost:3000',
    if (error) {
      //console.log(error) //debug才開啟這行
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
