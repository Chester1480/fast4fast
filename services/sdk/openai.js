
const config = require('config');
const secretKey = config.get('openai').secretKey;
const axios = require('axios');

const postStreamResponse = async (url, headers,data) => {
    return new Promise(async (resolve, reject) => { 
        try {
            let paramters = {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
            } 
            const response = await fetch(url, paramters);
            const reader = response.body.getReader();
            let content = "";
            let decoder = new TextDecoder('utf-8');
            while (true) {
                const { value, done } = await reader.read();
                content += decoder.decode(value);;
                console.log(content)
                if (done) break;
            }
            return resolve(content);
        } catch (error) {
            console.log(error);
            return reject(error);
        }
    })
}

const post = async function (url, headers,data) {
    return new Promise(async (resolve, reject) => { 
        try {
            let paramters = {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
            } 
            const response = await fetch(url, paramters);
            return resolve(response.json());
        } catch (error) {
            return reject(error);
        }
    })
}


exports.Chatgpt = async (question) => {

    const url = "https://api.openai.com/v1/completions";

    const headers = {
          "Content-Type": 'application/json',
          "Authorization": `Bearer `+secretKey
    };
    const data = {
        model: "text-davinci-003",
        prompt: question,
        temperature: 0.2,
        max_tokens: 1000,
        // stream: true,
    };
    const result = await post(url, headers, data);
    console.log(result);
    return result;

    // const result = await post(url, headers, data);
    // return result;

    //#region 回傳格式
    // {
    //     "id": "cmpl-6xlGJ4RJ8YfYbf4jmuojGou1iauJs",
    //     "object": "text_completion",
    //     "created": 1679701047,
    //     "model": "text-davinci-003",
    //     "choices": [
    //         {
    //             "text": "回覆訊息",
    //             "index": 0,
    //             "logprobs": null,
    //             "finish_reason": "stop"
    //         }
    //     ],
    //     "usage": {
    //         "prompt_tokens": 10,
    //         "completion_tokens": 272,
    //         "total_tokens": 282
    //     }
    // }
    //#endregion
      
}


exports.CreateImage = async (prompt) => {

    const url = "https://api.openai.com/v1/images/generations";

    const headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer `+secretKey
    };

    const data = {
        n: "2",
        prompt,
        size: "1024x1024"
    };

    const result = await post(url, headers, data);
    return result;
}

/**
 * 語音翻譯成文字
 */
exports.CreateTranscription = async (text) => { 

    const url = "https://api.openai.com/v1/images/generations";

    const headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer `+secretKey
    };

    const data = {
        file: "audio.mp3",
        model:"whisper-1",
    };

    const result = await post(url, headers, data);
    return result;
}
