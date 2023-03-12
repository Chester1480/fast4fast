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

const jobSwitch = new Map();

let OneMinuteSchedule;
let TenMinutesSchedule;
let HalfhourSchedule;
let OnehourSchedule;
let EverydaySchedule;

function GetJobName() {
    const language = new Map([
        ['OneMinuteJob', "一分鐘排程"]
        ['TenMinutesJob', "十分鐘排程"]
        ['HalfhourJob', "半小時鐘排程"]
        ['OnehourJob', "一小時排程"]
        ['EverydayJob', "每天排程"]
    ]);
    return language;
}

function GetCronMap() {
    let cronMap = new Map([
        ['OneMinuteJob', '*/1 * * * *']
        ['TenMinutesJob', '*/10 * * * *']
        ['HalfhourJob', '*/30 * * * *']
        ['OnehourJob', '*/60 * * * *']
        ['EverydayJob', '*/1440 * * * *']
    ])
    return cronMap;
}

exports.OneMinuteJob = async function () {
    const jobsLabel = "OneMinuteJob";
    jobSwitch.set(jobsLabel, 1);
    const cron = GetCronMap().get(jobsLabel)
    OneMinuteSchedule = schedule.scheduleJob(cron, function () {
        const status = jobSwitch.get(jobsLabel);
        if (status) {
            
        }
    });
}

//#region 另一種寫法
// exports.CancelOneMinuteJob = async function () {
//     if (OneMinuteSchedule && OneMinuteSchedule.cancel) {
//         OneMinuteSchedule.cancel();
//         cacheJs.set('OneMinuteJob', 0);
//     }
// }

// exports.RescheduleOneMinuteJob = async function () {
//     OneMinuteSchedule.reschedule('*/1 * * * *');
//     cacheJs.set('OneMinuteJob', 1);
// }
//#endregion

exports.TenMinutesJob = async function () {
    const jobsLabel = "TenMinutesJob";
    jobSwitch.set(jobsLabel, 1);
    const cron = GetCronMap().get(jobsLabel)
    TenMinutesSchedule= schedule.scheduleJob(cron, function () {
        const status = jobSwitch.get(jobsLabel);
        if (status) {
            
        }
    });
}

exports.HalfhourJob = async function () {
    const jobsLabel = "HalfhourJob";
    jobSwitch.set(jobsLabel, 1);
    const cron = GetCronMap().get(jobsLabel)
    TenMinutesSchedule= schedule.scheduleJob(cron, function () {
        const status = jobSwitch.get(jobsLabel);
        if (status) {
            
        }
    });
}

exports.OnehourJob = async function () {
    const jobsLabel = "OnehourJob";
    jobSwitch.set(jobsLabel, 1);
    const cron = GetCronMap().get(jobsLabel)
    TenMinutesSchedule= schedule.scheduleJob(cron, function () {
        const status = jobSwitch.get(jobsLabel);
        if (status) {
            
        }
    });
}

exports.EverydayJob = async function () {
    const jobsLabel = "EverydayJob";
    jobSwitch.set(jobsLabel, 1);
    const cron = GetCronMap().get(jobsLabel)
    TenMinutesSchedule= schedule.scheduleJob(cron, function () {
        const status = jobSwitch.get(jobsLabel);
        if (status) {
            
        }
    });
}

// exports.AddNewJob = async (cronTime ) => {
//     const newschedule = schedule.scheduleJob(cronTime , function(){
//         // console.log('OneMinuteJob');
//         cacheJs.set('OneMinuteJob', 1);
//     });
// }