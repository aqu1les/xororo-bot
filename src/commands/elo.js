const Discord = require('discord.js');
const axios = require("axios");
const API_KEY = process.env.API_KEY;

async function getElo(username) {
    try {
        const response = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${API_KEY}`);
        const userId = response.data.id;
        const eloResponse = await axios.get(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${userId}?api_key=${API_KEY}`);
        let resp = [];
        await eloResponse.data.map(queue => {
            if (queue.queueType == "RANKED_SOLO_5x5") {
                resp.push(`Solo: ${queue.tier} ${queue.rank}`);
            }
            if (queue.queueType == "RANKED_FLEX_SR") {
                resp.push(`Flex: ${queue.tier} ${queue.rank}`);
            }
        });
        return resp.join(" ");
    } catch (err) {
        return "Erro na conexão com a API da Rito Gomes!";
    }
}

module.exports = {
    run: async (client, message, args) => {
        const username = String(args.join(""));
        const response = await getElo(username);
        message.channel.send(`${args.join(" ")}\n${response}`);
    },
    get command() {
        return {
            name: 'elo',
            usage: 'elo'
        }
    }
}