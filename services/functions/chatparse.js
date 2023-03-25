const prefix = '$';
//固定指令
const GetFixCommandSet = () => {
    const crudMap = new Set([
        prefix+'gpt',
        // `${prefix}add`,
        // `${prefix}update`,
        // `{prefix}delete`,
        prefix + '',
        prefix + '指令',
        prefix + 'gif',
    ]);
    const crudChMap = new Set([
        prefix+'gpt',
        // `${prefix}新增`,
        // `${prefix}修改`,
        // `{prefix}刪除`,
        prefix + '股價',
        prefix + '指令',
        prefix + 'gif',
    ]);
    return {
        crudMap,crudChMap
    }
}

exports.ParseCommand = async (message) => {
    const { crudMap } = GetFixCommandSet();
    if (crudMap.has(message)) {
        return true;
    } else {
        return false;
    }
}

exports.ChParseCommand = async (message) => {
    const {  crudChMap } = GetFixCommandSet();
    if (crudChMap.has(message)) {
        return true;
    } else {
        return false;
    }
    
}


exports.FixCommands = async (message) => {
    const fixedCommansSet = new Set([
        prefix + '股價',
        prefix + '指令',
        prefix + 'gpt',
        // prefix + 'gif',
        //#region 暫時先關閉功能
        // prefix + '新增內容',
        // prefix + '增加內容',
        // prefix + '吃啥',
        // prefix + '新增',
        // prefix + '修改',
        // prefix + '刪除',
        // prefix + 'help'
        //#endregion
    ]);
    return fixedCommansSet;
}