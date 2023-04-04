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
let TenMinutesSchedule;
let HalfhourSchedule;
let OnehourSchedule;
let EverydaySchedule;

exports.excute = async function () { 
    await InitSwitch();
    await InitJobNameMap();
    await InitCronMap();

    await OneMinuteJob();
}

const InitJobNameMap = async function () {
    const jobName = {
        'OneMinuteJobName':  "一分鐘排程",
        'TenMinutesJobName':"十分鐘排程",
        'HalfhourJobName': "半小時鐘排程",
        'OnehourJobName':  "一小時排程",
        'EverydayJobName': "每天排程",
    }
    for await (const [key,value] of Object.entries(jobName)) {
        await cacheJs.set(key, value);
    }
}

const InitCronMap = async function () {
    const cron = {
        'cronOneMinuteJob': '* * * * *',
        'cronTenMinutesJob': '*/10 * * * *',
        'cronHalfhourJob': '*/30 * * * *',
        'cronOnehourJob': '*/60 * * * *',
        'cronEverydayJob': '*/1440 * * * *',
    }
    for await (const [key,value] of Object.entries(cron)) {
        await cacheJs.set(key, value);
    }
}

const InitSwitch = async function () {
    const jobSwitchArray = [
        'OneMinuteJob',
        'TenMinutesJob',
        'HalfhourJob',
        'OnehourJob',
        'EverydayJob',
    ]
    for await (const item of jobSwitchArray) {
        await cacheJs.set(item, 1);
    }
}

exports.getJobSwitch = async function () { 
    let jobSwitchArray = [
        'OneMinuteJob',
        'TenMinutesJob',
        'HalfhourJob',
        'OnehourJob',
        'EverydayJob',
    ]
    let object = {} ;
    for await (const item of jobSwitchArray) {
        object[item] = await cacheJs.get(item);
    }
    return object;
}

exports.setJobSwitch = async function (jobName, status) { 
    await cacheJs.set(jobName, status);
}

const OneMinuteJob = async function () {
    const jobsLabel = "OneMinuteJob";
    const cron = cacheJs.get("cron"+jobsLabel);
    OneMinuteSchedule = schedule.scheduleJob(cron, async function () {
        const status = await cacheJs.get(jobsLabel)
        if (status) {
            // console.log('OneMinuteJob')
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

const TenMinutesJob = async function () {
    const jobsLabel = "TenMinutesJob";
    const cron = cacheJs.get("cron"+jobsLabel);
    TenMinutesSchedule = schedule.scheduleJob(cron, async function () {
        const status = await cacheJs.get(jobsLabel)
        if (status) {
        }
    });
}

const HalfhourJob = async function () {
    const jobsLabel = "HalfhourJob";
    const cron = cacheJs.get("cron"+jobsLabel);
    HalfhourSchedule = schedule.scheduleJob(cron, async function () {
        const status = await cacheJs.get(jobsLabel)
        if (status) {
        }
    });
}

const OnehourJob = async function () {
    const jobsLabel = "OnehourJob";
    const cron = cacheJs.get("cron"+jobsLabel);
    OnehourSchedule = schedule.scheduleJob(cron, async function () {
        const status = await cacheJs.get(jobsLabel)
        if (status) {
        }
    });
}

const EverydayJob = async function () {
    const jobsLabel = "EverydayJob";
    const cron = cacheJs.get("cron"+jobsLabel);
    EverydaySchedule = schedule.scheduleJob(cron, async function () {
        const status = await cacheJs.get(jobsLabel)
        if (status) {
        }
    });
}

exports.AddNewJob = async (cronTime ) => {
    const newschedule = schedule.scheduleJob(cronTime, function () {
        
    });
}