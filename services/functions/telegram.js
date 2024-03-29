const config = require('config');
// const token = config.get('spotify').token;
const TelegramBot = require('node-telegram-bot-api');
const token = config.get('telegram').bot1;
const bot = new TelegramBot(token, { polling: true });
const chatparse = require('./chatparse');
const openai = require('../sdk/openai');

bot.on('message', async function (msg){
    // const chatId = msg.chat.id;
    const { from, chat, text , date } = msg;
    if(from.is_bot == false){//排除機器人說的話
        const payload = {
            chatId:chat.id,
            userName:from.username,
            language:from.language_code,
            text
        }
        await Strategies(chat.type, payload);
        //hatparse.ParseCommand(text);
    }
    // 回應方式sticker
    // if(text =="笑死" ){
    //     bot.sendSticker(chatId,'CAACAgUAAxkBAAMOYmjXdQAB6CEEov1ebzOUmMAZg6iwAAKjBQACmA5ZVCwVH8Fl-QGeJAQ');
    // }
    // send a message to the chat acknowledging receipt of their message
    //bot.sendMessage(chatId, 'Received your message');
});

const Strategies = async (type, payload) => {
    
    const fns = {
        'group': fn = (payload)=> {  //從機器人加入的群組收到的
            groupParse(payload)
        } ,
        'private':fn = (payload)=> { //從使用者對機器人發話收到的
            privateParse(payload)
        },
    }
    await fns[type](payload);
};

async function groupParse(payload){
    const { chatId, userName, language, text } = payload;
    const result = await openai.chatgpt(text);
    console.log("groupParse")
    // const parseResult = await stringParse(text , language);

}

async function privateParse(payload){
    const { chatId, userName, language, text } = payload;
    const result = await openai.chatgpt(text);
    console.log("privateParse")
}

// async function stringParse(text,language){
//     text = text.trim();
//     if(text.startsWith('$')){
//         const keywords = languageMap.get(language); 
//         const content = text.slice(1,text.length);
//         if(keywords.includes(content)){ 

//         }
//     }
// }


// bot.onText('cmd', function (msg) {
//     // console.log(msg);
// });

// //直接對機器人發話 /test 類似指令
// bot.onText('test', function (msg) {
//     // console.log(msg);
// });

// //收到Start訊息時會觸發這段程式
// bot.onText(/\/start/, function (msg) {
//     var chatId = msg.chat.id; //用戶的ID
//     var resp = 'Hi'; //括號裡面的為回應內容，可以隨意更改
//     // console.log(11);
//     bot.sendMessage(chatId, resp); //發送訊息的function
// });


// const startKey = ["$"];
// const languageMap = new Map();
// const cnCommads = ['查詢'];
// const Commads = ['Inquire'];

// languageMap.set("tw",cnCommads);
// languageMap.set("us",Commads);

// bot.onText(/\/echo (.+)/, (msg, match) => {
//     // 'msg' is the received Message from Telegram
//     // 'match' is the result of executing the regexp above on the text content
//     // of the message
  
//     const chatId = msg.chat.id;
//     const resp = match[1]; // the captured "whatever"
  
//     // send back the matched "whatever" to the chat
//     bot.sendMessage(chatId, resp);
// });

// api寫法
// var id = "你要發送對象的ID"
// var token = "你機器人的token"

// function sendtext(){
//   var payload = {
//       "method": "sendMessage",
//       'chat_id': id,
//       'text': 'test text'
//     }
//     start(payload);
// }

// function start(payload) {
//   var data = {
//       "method": "post",
//       "payload": payload
//   } 
//   var returned = UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/", data);
  
//   var d = new Date();
//   var SpreadSheet = SpreadsheetApp.openById("你試算表的id");
//   var Sheet = SpreadSheet.getSheetByName("試算表的名稱");
//   var LastRow = Sheet.getLastRow();
//   Sheet.getRange(LastRow + 1, 1).setValue(d);
//   Sheet.getRange(LastRow + 1, 2).setValue(data);
// } 