
const config = require('config');
const secretKey = config.get('openai').secretKey;

const url = () => {
    return "https://api.openai.com/v1/completions";
}

const defaultModel = () => {
    return "text-davinci-003";
}


exports.chatgpt = async (question) => {

    const data = JSON.stringify({
        model: defaultModel,
        prompt: enrichUserPromptWithContext(question),
        max_tokens: 100,
    });

    //const token = Buffer.from(`${clientId}:${clientSecret}`, 'utf-8').toString('base64');
    const headers = {
        headers: {
          Accept: 'application/json',
          Authorization: `Basic ${ secretKey }`
        }
    };

    const response = await axios.post(
        url,
        headers,
        data,
    );

    //#region 回傳格式
    // response ={
    //     "id": "chatcmpl-123",
    //     "object": "chat.completion",
    //     "created": 1677652288,
    //     "choices": [{
    //       "index": 0,
    //       "message": {
    //         "role": "assistant",
    //         "content": "\n\nHello there, how may I assist you today?",
    //       },
    //       "finish_reason": "stop"
    //     }],
    //     "usage": {
    //       "prompt_tokens": 9,
    //       "completion_tokens": 12,
    //       "total_tokens": 21
    //     }
    // }
    //#endregion
      
    return response;
}