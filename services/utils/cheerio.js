const request = require('request');
const cheerio = require('cheerio');

exports.load = async (url) => {
     return new Promise(async (resolve, reject) => { 
        try {
                // 發送 HTTP 請求獲取網頁內容
                request(url, (error, response, html) => {
                    if (!error && response.statusCode === 200) {
                        // 用 Cheerio 載入 HTML 內容
                        const $ = cheerio.load(html);

                        // 篩選出需要的數據
                        const titles = [];
                        $('h2.title').each((i, el) => {
                            titles.push($(el).text());
                        });
                       
                        // 將數據輸出到控制台
                        // console.log(titles);
                        return titles;
                    }
                });
        } catch (error) {
            return reject(error);
        }
    })
}