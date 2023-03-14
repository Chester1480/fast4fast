const dayjs = require('dayjs');

// https://www.npmjs.com/package/dayjs
// 新增指令內容 
exports.addCommand = async (message, key, text) => {
    
}

/**
 * 驗證返回的時間是否正確
 * @param {*} date 
 * @returns 
 */
exports.IsValidDate = async (date) => {
    return dayjs(date).isValid();
}

/**
 * 取得今天日期
 * @returns 'YYYY-MM-DD'
 */
exports.GetToday_YMD_Format = async () => {
    const now = dayjs();
    return dayjs(now).format('YYYY-MM-DD');
}

/**
 * 取得今天日期 時分秒
 * @returns 'YYYY-MM-DD hh:mm:ss'
 */
exports.GetToday_YMDhms_Format = async () => {
    const now = dayjs();
    return dayjs(now).format('YYYY-MM-DD hh:mm:ss');
}