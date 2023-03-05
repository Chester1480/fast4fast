const winston = require('winston');

const logger = winston.createLogger({
    // 當 transport 不指定 level 時 , 使用 info 等級
    level: 'info',
    // 設定輸出格式
    format: winston.format.json(),
    // 設定此 logger 的日誌輸出器
    transports: [
      // 只有 error 等級的錯誤 , 才會將訊息寫到 error.log 檔案中
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      // info or 以上的等級的訊息 , 將訊息寫入 combined.log 檔案中
      new winston.transports.File({ filename: 'combined.log' }),
    ],
});

//#region 下方為呼叫 log 的各種方式
// logger.log('info', 'Hello winston (・∀・)ノ');
// logger.error('Here we got an error (ノ﹏ヽ)');
// logger.log({
//   level: 'verbose',
//   message: 'here you will get some verbose'
// });
//#endregion

exports.ErrorLog = async () => {
    if (process.env.NODE_ENV !== 'prod') {
        logger.add(new winston.transports.Console({
          // simple 格式 : `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
          format: winston.format.simple(),
        }));
      }
}

exports.InfoLog = async () => {
    if (process.env.NODE_ENV !== 'prod') {
        logger.add(new winston.transports.Console({
          // simple 格式 : `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
          format: winston.format.simple(),
        }));
      }
}

