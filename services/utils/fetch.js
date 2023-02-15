exports.post = async function (url, data) {
    return new Promise(async (resolve, reject) => { 
        try {
            let paramters = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data),
            } 
            const response = await fetch(url, paramters);
            return resolve(response.json());
        } catch (error) {
            return reject(error);
        }
    })
}

exports.get = async function (url, data) {
    return new Promise(async (resolve, reject) => { 
        try {
            const response = await fetch(url);
            return resolve(response.json());
        } catch (error) {
            return reject(error);
        }
    })
}