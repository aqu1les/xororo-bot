import { Message, CommandInteraction, Client } from 'discord.js';
import axios from 'axios';

import { AppCommand } from '../Command';

const RIOT_API_KEY = process.env.RIOT_API_KEY;

export class EloCommand implements AppCommand {
  readonly displayName = 'elo';
  readonly usage = 'elo';
  readonly description = 'Retorna o seu elo no lolzito';
  readonly interactionOptions = [
    {
      name: 'username',
      type: 'STRING',
      description: 'Seu nick do lolzinho',
      required: true
    }
  ];

  async run(
    client: Client,
    event: Message | CommandInteraction,
    args: string[]
  ) {
    const username = String(args.join(''));
    const response = await getElo(username);

    event.reply(`${response}`);
  }
}

async function getElo(username: string) {
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
      resp = await eloResponse.data.reduce((acc: any, queue: any) => {
        const sentence: any = {
          RANKED_SOLO_5x5: `\nSolo: ${queue.tier} ${queue.rank} - ${queue.leaguePoints} pdls`,
          RANKED_FLEX_SR: `\nFlex: ${queue.tier} ${queue.rank} - ${queue.leaguePoints} pdls`
        };

        return [...acc, sentence[queue.queueType]];
      }, []);
    } else {
      resp.push(`o usuário não possui um histórico de partidas rankeadas.`);
    }

    return resp.join('\n');
  } catch (err: any) {
    if (err.toJSON().message === 'Request failed with status code 404') {
      return 'o usuario não existe!';
    }

    return 'deu erro na conexão com a API da Rito Gomes!';
  }
}
