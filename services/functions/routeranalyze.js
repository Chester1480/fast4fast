const ip = require('ip');
const NODE_ENV = process.env.NODE_ENV;
const jwt = require('jsonwebtoken');
const { getTextCode } = require('../ShareModule/model');
const config = require('config');
const jwtSecret = config.get('jwtSecret');

//分析路由 擷取的所有內容 加以分析
exports.strategies = async (parameters) => {
    
    // 黑名單的ip 直接返回 不給使用所有api
    // if (getBlackList(ip)) {
    //      return {};
    // }

    const {
        routerPrefix,
        ip,
        host,
        authorization,
        url, 
        method,
        query,
        body,
        raw
    } = parameters;
    
    // const whiteListRoute = new Set([
    //     'BackStage'
    // ]);
    
    //需要驗證 authorization的路由前墜
    const permissionRoute = new Set([
        'BackStage'
    ]);

    //正式環境需要驗證 authorization
    if (NODE_ENV == "prod") {

        // 需要加白名單才能進入的路由
        // if (whiteListRoute.has(routerPrefix)) {
        //     if (!getWhiteList(ip)) { 
        //         return {
        //         };
        //     }
        // }

        if (permissionRoute.has(routerPrefix)) {

            if (!authorization) {
                return {
                    statusCode: 400,
                    message: getTextCode("1003"),
                    data:[]
                };
            }

            const jwtToken = authorization.split(' ')[1];

            if (!jwtToken) {
                return {
                    statusCode: 400,
                    message: getTextCode("1003"),
                    data:[]
                };
            }

            var decoded = jwt.verify(jwtToken, jwtSecret);

            //解析token錯誤
            if (!decoded) {
                return {
                    statusCode: 400,
                    message: getTextCode("1002"),
                    data:[]
                };
            } else {
                req.userInfo = decoded;
            }
        }
    }

    return {
        statusCode: 200,
        message: "",
        data:[]
    };
   
    // const result = await fns[routerPrefix]();
    // return result;

}

//白名單才能使用
const getWhiteList = (ip) => {
    const whiteList = new set([]);
    if (!whiteList.has(ip)) {
        return false;
    }
    return true;
}

//黑名單不能使用
const getBlackList = (ip) => {
    const blockIps = new set([]);
    if (blockIps.has(ip)) {
        return false;
    }
    return true;
}

const backStage = async () => {
    
}
