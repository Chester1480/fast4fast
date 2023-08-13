const axios = require('axios');

exports.get = async function (url, parameters ) {
    const { headers , params } = parameters;
    const result = await axios.get(url,{
        headers,
        params
    });
    return result;
}

exports.post = async function (url, parameters) {
    const { headers , body } = parameters;
    const result = await axios.post(url,{
        headers,
        body,
        data
    });
    return result;
}