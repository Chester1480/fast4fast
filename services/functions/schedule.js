const { cacheJs } = require('../utils/utilspackage');
const schedule = require('node-schedule');

//#region node-schedule 格式
    // var rule = new schedule.RecurrenceRule();
    // rule.dayOfWeek = [1, 2, 3, 4, 5];
    // rule.minute = 50;
    // rule.hour = 12;

    // var message = schedule.scheduleJob("Announcement0", rule, function() {
    //     // make my announcement
    // })
    
//#endregion

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

let OneMinuteSchedule;

exports.OneMinuteJob = async function () {
    var taskOneMinute = '*/1 * * * *'
    OneMinuteSchedule = schedule.scheduleJob(taskOneMinute, function(){
        console.log('OneMinuteJob');
    });
}

exports.CancelOneMinuteJob = async function () {
    if (OneMinuteSchedule && OneMinuteSchedule.cancel) OneMinuteSchedule.cancel();
}

exports.RescheduleOneMinuteJob = async function () {
    OneMinuteSchedule.reschedule('*/1 * * * *');
}

exports.TenMinutesJob = async function () {


}

exports.HalfhourJob = async function () {


}

exports.OnehourJob = async function () {


}

exports.EverydayJob = async function () {


}