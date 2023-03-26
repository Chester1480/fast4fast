const { axiosJs } = require('../utils/utilspackage');


const domain = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/";

const GetApiUrls = () => {
    return new Map(
        [
            ["全部","F-C0032-001"],
            ["宜蘭","F-C0032-001"],
        ]
    );
}

//預報
exports.Forecast = async () => {
    
}

//觀測
exports.Observe = async () => {
    
}

//地震海嘯
exports.Earthquake = async () => {
    
}