const Discord = require('discord.js');
const axios = require('axios');
const RIOT_API_KEY = process.env.RIOT_API_KEY;

async function getElo(username) {
  try {
    const response = await axios.get(
      `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(
        username
      )}?api_key=${RIOT_API_KEY}`
    );
    if (!response.data) return 'Usuario não existe!';
    const userId = response.data.id;
    const eloResponse = await axios.get(
      `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${userId}?api_key=${RIOT_API_KEY}`
    );

    let resp = [];

    if (eloResponse.data.length > 0) {
      resp = await eloResponse.data.reduce((acc, queue) => {
        const sentence = {
          RANKED_SOLO_5x5: `\nSolo: ${queue.tier} ${queue.rank} - ${queue.leaguePoints} pdls`,
          RANKED_FLEX_SR: `\nFlex: ${queue.tier} ${queue.rank} - ${queue.leaguePoints} pdls`
        };

        return [...acc, sentence[queue.queueType]];
      }, []);
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
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message | Discord.CommandInteraction} event
   * @param {string[]} args
   */
  run: async (client, event, args) => {
    const username = String(args.join(''));
    const response = await getElo(username);
    event.reply(`${response}`);
  },
  get command() {
    return {
      name: 'elo',
      usage: 'elo',
      description: 'Retorna o seu elo no lolzito',
      options: [
        {
          name: 'username',
          type: 'STRING',
          description: 'Seu nick do lolzinho',
          required: true
        }
      ]
    };
  }
};
