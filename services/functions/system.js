const { mongo,redis } = require('../database/databasepackage');
/**
 * 重跑伺服器會先做一次
 */
exports.DataBaseToRedis = async () => {
    const data = await mongo.find("System_Config");
    if (data) {
        
    }
}

/**
 * 更新System的資料庫和redis 資料
 */
exports.UpdateSysTemData = async () => {
    //更新資料庫
    //更新redis
}

const UpdateRedis = async () => {
    
}

const UpdateDataBase = async () => {
    
}