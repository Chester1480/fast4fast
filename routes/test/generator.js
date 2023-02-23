const config = require('config');
const environment = config.get('environment');

const { faker } = require('@faker-js/faker');
const { mongo } = require('../../services/database/databasepackage');
const { encryptJs } = require('../../services/utils/utilspackage');

async function isDev() {
    if (environment == 'dev') { //產生測試環境用資料
        return true;
    }
    return false;
}

module.exports = async function (fastify, opts) {

 
    fastify.get('/createUser', async function (request, reply) {
        
        let { count } = request.query;
        if (!count) {
            count = 1;
        }
        if (!await isDev()) { //產生測試環境用資料
           return
        }
        let usersArray = [];
        for (let index = 0; index < count; index++) {
            let user = {
                avatar:faker.image.avatar(),
                account: faker.internet.userName(),
                password: encryptJs.bcryptHash("@123456"),
                name: faker.internet.userName(),
                email: faker.internet.email(),
                phone:"",
                type: 2,//normal:0 preminum:1 test:2
                registeredDate: Date.now(),
                googleOuath2: {}
            }
            usersArray.push(user);
        }
        
        const result = await mongo.insert("User", usersArray);
        return result
    })

}
    