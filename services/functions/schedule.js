const { cacheJs } = require('../utils/utilspackage');
const schedule = require('node-schedule');

//#region cron 表達式
// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
//#endregion

exports.OneMinutesJob = async function () {
    var taskFreq = '*/1 * * * *'
    const sche = schedule.scheduleJob(taskFreq, function(){
        console.log('OneMinutesJob');
    });
}

exports.TenMinutesJob = async function () {


}

exports.HalfhourJob = async function () {


}

exports.OnehourJob = async function () {


}

exports.EverydayJob = async function () {


}