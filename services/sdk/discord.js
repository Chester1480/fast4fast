const { Client, MessageEmbed } = require('discord.js');
const client = new Client({
    partials: ['MESSAGE']
});

exports.login = async (token) => {
    client.login(token);
    return client;
}

