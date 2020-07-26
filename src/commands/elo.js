const axios = require('axios');
const API_KEY = process.env.API_KEY;

async function getElo(username) {
  try {
    const response = await axios.get(
      `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${API_KEY}`
    );
    if (!response.data) return 'Usuario não existe!';
    const userId = response.data.id;
    const eloResponse = await axios.get(
      `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${userId}?api_key=${API_KEY}`
    );

    let resp = [];

    if (eloResponse.data.length > 0) {
      await eloResponse.data.map((queue) => {
        if (queue.queueType == 'RANKED_SOLO_5x5') {
          resp.push(
            `\nSolo: ${queue.tier} ${queue.rank} - ${queue.leaguePoints} pdls`
          );
        } else if (queue.queueType == 'RANKED_FLEX_SR') {
          resp.push(
            `\nFlex: ${queue.tier} ${queue.rank} - ${queue.leaguePoints} pdls`
          );
        }
      });
    } else {
      resp.push(`o usuário não possui um histórico de partidas rankeadas.`);
    }

    return resp.join('\n');
  } catch (err) {
    if (err.toJSON().message === 'Request failed with status code 404')
      return 'o usuario não existe!';
    return 'deu erro na conexão com a API da Rito Gomes!';
  }
}

module.exports = {
  run: async (client, message, args) => {
    const username = String(args.join(''));
    const response = await getElo(username);
    message.reply(`${response}`);
  },
  get command() {
    return {
      name: 'elo',
      usage: 'elo'
    };
  }
};
