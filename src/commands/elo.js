const Discord = require('discord.js');
const axios = require("axios");
const API_KEY = process.env.API_KEY;

async function getElo(username) {
    const response = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${API_KEY}`);
    const userId = response.data.id;
    const eloResponse = await axios.get(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${userId}?api_key=${API_KEY}`);
    const resp = [];
    eloResponse.data.forEach(queue => {
        if (queue.queueType === "RANKED_SOLO_5X5") {
            return resp.push(`Solo: ${queue.tier} ${queue.rank}`);
        }
        if (queue.queueType === "RANKED_FLEX_SR") {
            return resp.push(`Flex: ${queue.tier} ${queue.rank}`);
        }
    });
    return resp;
}

module.exports = {
    run: async (client, message, args) => {
        return console.log(args);
        const username = String(args);
        const response = await getElo(username);
        message.channel.send(response);
    },
    get command() {
        return {
            name: 'elo',
            usage: 'elo'
        }
    }
}