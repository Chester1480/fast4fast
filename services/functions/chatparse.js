const { mongo , redis }  = require('../../services/database/databasepackage')
const { lodashJs } = require('../../services/utils/utilspackage');


const prefix = '$';

//固定指令
const GetFixCommandSet = () => {
    const crudMap = new Set([
        `${prefix}gpt`,
        // `${prefix}add`,
        // `${prefix}update`,
        // `{prefix}delete`,
    ]);
    const crudChMap = new Set([
        `${prefix}gpt`,
        // `${prefix}新增`,
        // `${prefix}修改`,
        // `{prefix}刪除`,
    ]);
    return {
        crudMap,crudChMap
    }
}

exports.ParseCommand = async (message) => {
    const { crudMap } = GetFixCommandSet();

    if (!message.content.startsWith(prefix)) {
        return {
            status:0,
            message:'前墜錯誤',
        };;
    }
   
    const args = message.split(' ');
    return {
        status:1,
        message:args[1],
    };
}

exports.ChParseCommand = async (message) => {
    const {  crudChMap } = GetFixCommandSet();
    if (crudChMap.has(message)) {
        
    }
    
}