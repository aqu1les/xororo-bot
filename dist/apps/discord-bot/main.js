/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/discord-bot/src/Adapters/embed.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const discord_js_1 = __webpack_require__("discord.js");
function createEmbed(title, color, description, url = null, thumbnail = null, footer = null, timestamp = null) {
    const embed = new discord_js_1.MessageEmbed()
        .setTitle(title)
        .setColor(color)
        .setDescription(description);
    if (url)
        embed.setURL(url);
    if (thumbnail)
        embed.setThumbnail(thumbnail);
    if (footer)
        embed.setFooter(footer.text, footer.icon);
    if (timestamp)
        embed.setTimestamp();
    return embed;
}
exports["default"] = createEmbed;


/***/ }),

/***/ "./apps/discord-bot/src/Adapters/utils.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.millisToMinutes = void 0;
function millisToMinutes(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = parseInt(((millis % 60000) / 1000).toFixed(0));
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
exports.millisToMinutes = millisToMinutes;


/***/ }),

/***/ "./apps/discord-bot/src/Adapters/ytb.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const ytsr_1 = (0, tslib_1.__importDefault)(__webpack_require__("ytsr"));
const ytpl_1 = (0, tslib_1.__importDefault)(__webpack_require__("ytpl"));
exports["default"] = {
    search: async (keyword) => {
        const response = await (0, ytsr_1.default)(keyword);
        const musics = response.items.filter((item) => item.type === 'video');
        return musics[0];
    },
    fetchPlaylist: async (playlistLink) => {
        const result = await (0, ytpl_1.default)(playlistLink);
        return result.items;
    },
    validateURL: youtubeParser
};
function youtubeParser(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
}


/***/ }),

/***/ "./apps/discord-bot/src/Commands/CommandsManager.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var CommandsManager_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommandsManager = void 0;
const tslib_1 = __webpack_require__("tslib");
const ProvidersDecorators_1 = __webpack_require__("./apps/discord-bot/src/Providers/ProvidersDecorators.ts");
const Handlers_1 = __webpack_require__("./apps/discord-bot/src/Commands/Handlers/index.ts");
let CommandsManager = CommandsManager_1 = class CommandsManager {
    state = new Map();
    static instance;
    constructor() {
        if (CommandsManager_1.instance) {
            return CommandsManager_1.instance;
        }
        CommandsManager_1.instance = this;
    }
    get commands() {
        const response = {};
        [...this.state.entries()].forEach(([key, value]) => (response[key] = value));
        return response;
    }
    forDiscord() {
        return [...this.state.entries()].map(([key, props]) => ({
            name: key,
            description: props.description,
            options: props.interactionOptions
        }));
    }
    async load() {
        return new Promise((resolve, reject) => {
            try {
                Handlers_1.COMMANDS_HANDLERS.forEach((commandConstructor) => {
                    try {
                        const commandInstance = new commandConstructor();
                        this.set(commandInstance.displayName, commandInstance);
                    }
                    catch (e) {
                        console.log(`Deu ruim inicializando comando ${commandConstructor}`);
                        console.error(e);
                        throw e;
                    }
                });
                resolve(Handlers_1.COMMANDS_HANDLERS.map((command) => command.name));
            }
            catch (e) {
                reject(e);
            }
        });
    }
    set(commandName, commandInstance) {
        this.state.set(commandName, commandInstance);
    }
};
CommandsManager = CommandsManager_1 = (0, tslib_1.__decorate)([
    (0, ProvidersDecorators_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [])
], CommandsManager);
exports.CommandsManager = CommandsManager;


/***/ }),

/***/ "./apps/discord-bot/src/Commands/Handlers/comandos.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommandsListCommand = void 0;
const CommandsManager_1 = __webpack_require__("./apps/discord-bot/src/Commands/CommandsManager.ts");
const Helpers_1 = __webpack_require__("./apps/discord-bot/src/Helpers/index.ts");
class CommandsListCommand {
    displayName = 'comandos';
    usage = 'comandos';
    description = 'Lista todos os comandos do bot';
    interactionOptions = [];
    get commandsManager() {
        return (0, Helpers_1.resolve)(CommandsManager_1.CommandsManager);
    }
    async run(client, event) {
        const commands = [...Object.keys(this.commandsManager.commands)]
            .map((key) => `!${key}`)
            .join(' ');
        const message = `Os comandos são: ${commands}`;
        event.reply(message);
    }
}
exports.CommandsListCommand = CommandsListCommand;


/***/ }),

/***/ "./apps/discord-bot/src/Commands/Handlers/cu.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CuCommand = void 0;
const tslib_1 = __webpack_require__("tslib");
const User_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/discord-bot/src/Model/User.ts"));
class CuCommand {
    displayName = 'cu';
    usage = 'cu';
    description = 'Calcula a porcentagem de chances que você tem de comer o cu de alguém';
    interactionOptions = [
        {
            name: 'alvo',
            type: 'STRING',
            description: 'A pessoa que você gostaria de comer',
            required: true
        }
    ];
    async run(client, event, args) {
        if (args.length == 0) {
            return event.reply(' marque a pessoa que você gostaria de comer o cu.');
        }
        if (args[0].substring(0, 2) !== '<@') {
            return event.reply(' por favor marque a pessoa que você gostaria de comer o cu.');
        }
        const chances = getRandomInt(0, 101);
        let response = ` você tem ${chances}% de chances de comer o cu de ${args}.`;
        if (chances >= 100) {
            const member = event.member;
            await this.incrementCus(member.id, member.user.username, String(args[0]));
            response = ` com 100% de chances você comeu o cu de ${args}. Parabéns!`;
        }
        event.reply(response);
    }
    async incrementCus(id, username, target_id) {
        const user = await User_1.default.findOne({ uid: id });
        if (user) {
            user.cus_comidos = [...user.cus_comidos, target_id];
            await user.save();
        }
        else {
            await User_1.default.create({ uid: id, name: username });
        }
    }
}
exports.CuCommand = CuCommand;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


/***/ }),

/***/ "./apps/discord-bot/src/Commands/Handlers/cus.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CusCommand = void 0;
const tslib_1 = __webpack_require__("tslib");
const User_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/discord-bot/src/Model/User.ts"));
class CusCommand {
    displayName = 'cus';
    usage = 'cus';
    description = 'Lista quantos cus você já comeu';
    interactionOptions = [];
    async run(client, event, args) {
        const member = event.member;
        const response = await this.getCusComidos(member.id, member.user.username);
        event.reply(response);
    }
    async getCusComidos(id, username) {
        const user = (await User_1.default.findOne({ uid: id })) ||
            (await User_1.default.create({ uid: id, name: username }));
        if (user.cus_comidos.length === 0) {
            return 'você ainda não comeu o cu de ninguém';
        }
        const cus_comidos = user.cus_comidos.reduce((users, id) => ({
            ...users,
            [id]: users[id] ? users[id] + 1 : 1
        }), {});
        const response = Object.entries(cus_comidos)
            .map(([username, times]) => `${username} ${times}x`)
            .join('\n');
        return `Você comeu:\n${response}`;
    }
}
exports.CusCommand = CusCommand;


/***/ }),

/***/ "./apps/discord-bot/src/Commands/Handlers/elo.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EloCommand = void 0;
const tslib_1 = __webpack_require__("tslib");
const axios_1 = (0, tslib_1.__importDefault)(__webpack_require__("axios"));
const RIOT_API_KEY = process.env.RIOT_API_KEY;
class EloCommand {
    displayName = 'elo';
    usage = 'elo';
    description = 'Retorna o seu elo no lolzito';
    interactionOptions = [
        {
            name: 'username',
            type: 'STRING',
            description: 'Seu nick do lolzinho',
            required: true
        }
    ];
    async run(client, event, args) {
        const username = String(args.join(''));
        const response = await getElo(username);
        event.reply(`${response}`);
    }
}
exports.EloCommand = EloCommand;
async function getElo(username) {
    try {
        const response = await axios_1.default.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(username)}?api_key=${RIOT_API_KEY}`);
        if (!response.data)
            return 'Usuario não existe!';
        const userId = response.data.id;
        const eloResponse = await axios_1.default.get(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${userId}?api_key=${RIOT_API_KEY}`);
        let resp = [];
        if (eloResponse.data.length > 0) {
            resp = await eloResponse.data.reduce((acc, queue) => {
                const sentence = {
                    RANKED_SOLO_5x5: `\nSolo: ${queue.tier} ${queue.rank} - ${queue.leaguePoints} pdls`,
                    RANKED_FLEX_SR: `\nFlex: ${queue.tier} ${queue.rank} - ${queue.leaguePoints} pdls`
                };
                return [...acc, sentence[queue.queueType]];
            }, []);
        }
        else {
            resp.push(`o usuário não possui um histórico de partidas rankeadas.`);
        }
        return resp.join('\n');
    }
    catch (err) {
        if (err.toJSON().message === 'Request failed with status code 404') {
            return 'o usuario não existe!';
        }
        return 'deu erro na conexão com a API da Rito Gomes!';
    }
}


/***/ }),

/***/ "./apps/discord-bot/src/Commands/Handlers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.COMMANDS_HANDLERS = void 0;
const comandos_1 = __webpack_require__("./apps/discord-bot/src/Commands/Handlers/comandos.ts");
const cu_1 = __webpack_require__("./apps/discord-bot/src/Commands/Handlers/cu.ts");
const cus_1 = __webpack_require__("./apps/discord-bot/src/Commands/Handlers/cus.ts");
const elo_1 = __webpack_require__("./apps/discord-bot/src/Commands/Handlers/elo.ts");
const oi_1 = __webpack_require__("./apps/discord-bot/src/Commands/Handlers/oi.ts");
const xama_1 = __webpack_require__("./apps/discord-bot/src/Commands/Handlers/xama.ts");
const join_1 = __webpack_require__("./apps/discord-bot/src/Commands/Handlers/join.ts");
const lanse_1 = __webpack_require__("./apps/discord-bot/src/Commands/Handlers/lanse.ts");
const ping_1 = __webpack_require__("./apps/discord-bot/src/Commands/Handlers/ping.ts");
const pvt_1 = __webpack_require__("./apps/discord-bot/src/Commands/Handlers/pvt.ts");
const leave_1 = __webpack_require__("./apps/discord-bot/src/Commands/Handlers/leave.ts");
const pause_1 = __webpack_require__("./apps/discord-bot/src/Commands/Handlers/pause.ts");
const play_1 = __webpack_require__("./apps/discord-bot/src/Commands/Handlers/play.ts");
const queue_1 = __webpack_require__("./apps/discord-bot/src/Commands/Handlers/queue.ts");
const resume_1 = __webpack_require__("./apps/discord-bot/src/Commands/Handlers/resume.ts");
const skip_1 = __webpack_require__("./apps/discord-bot/src/Commands/Handlers/skip.ts");
const stop_1 = __webpack_require__("./apps/discord-bot/src/Commands/Handlers/stop.ts");
exports.COMMANDS_HANDLERS = [
    oi_1.OiCommand,
    comandos_1.CommandsListCommand,
    cu_1.CuCommand,
    cus_1.CusCommand,
    elo_1.EloCommand,
    join_1.JoinCommand,
    lanse_1.LanseCommand,
    ping_1.PingCommand,
    pvt_1.PvtCommand,
    xama_1.XamaCommand,
    leave_1.LeaveCommand,
    pause_1.PauseCommand,
    play_1.PlayCommand,
    queue_1.QueueCommand,
    resume_1.ResumeCommand,
    skip_1.SkipCommand,
    stop_1.StopCommand
];


/***/ }),

/***/ "./apps/discord-bot/src/Commands/Handlers/join.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JoinCommand = void 0;
const voice_connection_1 = __webpack_require__("./apps/discord-bot/src/Helpers/voice-connection.ts");
class JoinCommand {
    displayName = 'join';
    usage = 'join';
    description = 'Entra no seu canal de voz';
    interactionOptions = [];
    async run(client, event) {
        const member = event.member;
        if (!(0, voice_connection_1.memberIsOnVoiceChannel)(member)) {
            return event.reply(`vo entrar aonde? tu n ta em nenhum canal de voz diabo`);
        }
        if (!(0, voice_connection_1.botIsConnected)(event.guild)) {
            event.reply('Entrando...');
            return (0, voice_connection_1.createVoiceConnection)(member.voice.channel.id, event.guild);
        }
        return event.reply('to ocupado, da licença');
    }
}
exports.JoinCommand = JoinCommand;


/***/ }),

/***/ "./apps/discord-bot/src/Commands/Handlers/lanse.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LanseCommand = void 0;
const tslib_1 = __webpack_require__("tslib");
const User_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/discord-bot/src/Model/User.ts"));
class LanseCommand {
    displayName = 'lanse';
    usage = 'lanse';
    description = 'Te lansa uma braba';
    interactionOptions = [
        {
            name: 'braba',
            type: 'STRING',
            description: 'vai querer a braba?',
            required: false
        }
    ];
    async run(client, event) {
        const member = event.member;
        const brabas = await incBrabas(member.id, member.user.username);
        if (brabas === 1) {
            return event.reply(`lansou a braba pela primeira vez!`);
        }
        return event.reply(`Você lansou a braba ${brabas} vezes, fdp`);
    }
}
exports.LanseCommand = LanseCommand;
async function incBrabas(id, username) {
    const user = await User_1.default.findOne({ uid: id });
    if (user) {
        user.brabas = user.brabas + 1;
        await user.save();
        return user.brabas;
    }
    else {
        await User_1.default.create({ uid: id, name: username, brabas: 1 });
        return 1;
    }
}


/***/ }),

/***/ "./apps/discord-bot/src/Commands/Handlers/leave.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeaveCommand = void 0;
const tslib_1 = __webpack_require__("tslib");
const voice_1 = __webpack_require__("@discordjs/voice");
const voice_connection_1 = __webpack_require__("./apps/discord-bot/src/Helpers/voice-connection.ts");
const playlist_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/discord-bot/src/Features/playlist.ts"));
const playlist = (0, playlist_1.default)();
class LeaveCommand {
    displayName = 'leave';
    usage = 'leave';
    description = 'Sai do seu canal de voz';
    interactionOptions = [];
    async run(client, event) {
        const member = event.member;
        if (!(0, voice_connection_1.botIsConnected)(event.guild)) {
            return event.reply(`sai tu`);
        }
        if (!(0, voice_connection_1.memberIsOnVoiceChannel)(member)) {
            return event.reply(`se fude porra`);
        }
        const connection = (0, voice_1.getVoiceConnection)(event.guild.id);
        const channelMock = { id: connection?.joinConfig.channelId };
        if (!(0, voice_connection_1.isSameChannel)(channelMock, member.voice.channel)) {
            return event.reply(`tu nem ta nesse canal de voz amigão, me deixa em paz`);
        }
        connection?.disconnect();
        playlist.setPlaylist(event.guild.id);
        return event.reply(`bejo`);
    }
}
exports.LeaveCommand = LeaveCommand;


/***/ }),

/***/ "./apps/discord-bot/src/Commands/Handlers/oi.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OiCommand = void 0;
class OiCommand {
    displayName = 'oi';
    usage = 'oi';
    description = 'Salve?';
    interactionOptions = [];
    run(client, event) {
        return event.reply('EAI CARAIO');
    }
}
exports.OiCommand = OiCommand;


/***/ }),

/***/ "./apps/discord-bot/src/Commands/Handlers/pause.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PauseCommand = void 0;
class PauseCommand {
    displayName = 'pause';
    usage = 'pause';
    description = 'Pausa a música que está tocando';
    interactionOptions = [];
    async run(client, event) {
    }
}
exports.PauseCommand = PauseCommand;


/***/ }),

/***/ "./apps/discord-bot/src/Commands/Handlers/ping.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PingCommand = void 0;
class PingCommand {
    displayName = 'ping';
    usage = 'ping';
    description = 'Pong?';
    interactionOptions = [];
    run(client, event) {
        return event.reply('pong');
    }
}
exports.PingCommand = PingCommand;


/***/ }),

/***/ "./apps/discord-bot/src/Commands/Handlers/play.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlayCommand = void 0;
const tslib_1 = __webpack_require__("tslib");
const ytdl_core_1 = (0, tslib_1.__importDefault)(__webpack_require__("ytdl-core"));
const ytb_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/discord-bot/src/Adapters/ytb.ts"));
const playlist_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/discord-bot/src/Features/playlist.ts"));
const playlist = (0, playlist_1.default)();
const embed_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/discord-bot/src/Adapters/embed.ts"));
const utils_1 = __webpack_require__("./apps/discord-bot/src/Adapters/utils.ts");
const voice_connection_1 = __webpack_require__("./apps/discord-bot/src/Helpers/voice-connection.ts");
const play_on_voice_channel_1 = __webpack_require__("./apps/discord-bot/src/Features/play-on-voice-channel.ts");
let author = null;
class PlayCommand {
    displayName = 'play';
    usage = 'play';
    description = 'Toca musica né irmão';
    interactionOptions = [
        {
            name: 'music',
            type: 'STRING',
            description: 'Link da música ou o nome a ser pesquisado',
            required: false
        }
    ];
    async run(client, event, args) {
        const guild = event.guild;
        const member = event.member;
        const guildId = guild.id;
        if (args.length === 0) {
            if (!(0, voice_connection_1.botIsConnected)(guild)) {
                return event.reply('use !play <nome da musica> ou !play <link da musica no youtube> para tocar');
            }
            return;
        }
        if (!(0, voice_connection_1.memberIsOnVoiceChannel)(member)) {
            event.reply('vai pra um canal de voz primeiro corno');
            return;
        }
        author = author ?? (await client.users.fetch('246470177376567297'));
        if ('deferReply' in event) {
            await event.reply('to pensando aqui perai');
        }
        try {
            const result = await handleArguments(args, event.channel, guildId);
            if (!(0, voice_connection_1.botIsConnected)(guild)) {
                const connection = (0, voice_connection_1.createVoiceConnection)(member.id, guild);
                return (0, play_on_voice_channel_1.playOnVoiceConnection)(connection, event.channel, guildId, author);
            }
            if (result) {
                const clientResponse = (0, embed_1.default)(`Música adicionada à playlist`, '#e80a21', result.title, result.link || result.url, result.thumbnail);
                const fn = 'editReply' in event && event.deferred
                    ? event.editReply
                    : event.reply;
                return fn(clientResponse);
            }
        }
        catch (error) {
            const fn = 'editReply' in event && event.deferred ? event.editReply : event.reply;
            console.error(error);
            return fn('foi mal viado, deu algum erro aqui');
        }
    }
}
exports.PlayCommand = PlayCommand;
async function handlePlaylist(playlistURL, serverID) {
    return (await ytb_1.default.fetchPlaylist(playlistURL)).map((music) => playlist.addMusic(music, serverID)).length;
}
async function handleYtbSearch(keywords, serverID) {
    const music = await ytb_1.default.search(keywords);
    playlist.addMusic(music, serverID);
    return music;
}
async function handleYtbLink(URL, serverID) {
    const ytb_music = await ytdl_core_1.default.getBasicInfo(URL);
    const music = {
        thumbnail: ytb_music.thumbnail_url,
        link: URL,
        title: ytb_music.title,
        duration: (0, utils_1.millisToMinutes)(ytb_music.length_seconds * 1000)
    };
    playlist.addMusic(music, serverID);
    return music;
}
async function handleArguments(args, channel, guildId) {
    if (args.length === 1 && ytb_1.default.validateURL(args[0])) {
        try {
            const totalMusics = await handlePlaylist(ytb_1.default.validateURL(args[0]), guildId);
            channel.send(`${totalMusics} músicas adicionadas à playlist.`);
        }
        catch (e) {
            channel.send('deu erro adicionando as musicas da playlist parsero');
        }
    }
    else if (args.length === 1 && ytdl_core_1.default.validateURL(args[0])) {
        await handleYtbLink(args[0], guildId);
    }
    else {
        return await handleYtbSearch(args.join(' '), guildId);
    }
    return void 0;
}


/***/ }),

/***/ "./apps/discord-bot/src/Commands/Handlers/pvt.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PvtCommand = void 0;
class PvtCommand {
    displayName = 'pvt';
    usage = 'pvt';
    description = 'Sei lá';
    interactionOptions = [];
    run(client, event) {
        const avatar = event.member?.user.avatar;
        if (avatar) {
            return event.reply(avatar);
        }
        return;
    }
}
exports.PvtCommand = PvtCommand;


/***/ }),

/***/ "./apps/discord-bot/src/Commands/Handlers/queue.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueueCommand = void 0;
class QueueCommand {
    displayName = 'queue';
    usage = 'queue';
    description = 'Mostra a playlist atual';
    interactionOptions = [];
    run(client, event) {
    }
}
exports.QueueCommand = QueueCommand;


/***/ }),

/***/ "./apps/discord-bot/src/Commands/Handlers/resume.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResumeCommand = void 0;
class ResumeCommand {
    displayName = 'resume';
    usage = 'resume';
    description = 'Da play na musica pausada';
    interactionOptions = [];
    async run(client, event) {
    }
}
exports.ResumeCommand = ResumeCommand;


/***/ }),

/***/ "./apps/discord-bot/src/Commands/Handlers/skip.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SkipCommand = void 0;
class SkipCommand {
    displayName = 'skip';
    usage = 'skip';
    description = 'Pula a musica que tá tocando';
    interactionOptions = [];
    async run(client, event) {
    }
}
exports.SkipCommand = SkipCommand;


/***/ }),

/***/ "./apps/discord-bot/src/Commands/Handlers/stop.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StopCommand = void 0;
class StopCommand {
    displayName = 'stop';
    usage = 'stop';
    description = 'Para de tocar e vaza do canal de voz';
    interactionOptions = [];
    async run(client, event) {
    }
}
exports.StopCommand = StopCommand;


/***/ }),

/***/ "./apps/discord-bot/src/Commands/Handlers/xama.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.XamaCommand = void 0;
const tslib_1 = __webpack_require__("tslib");
const User_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/discord-bot/src/Model/User.ts"));
class XamaCommand {
    displayName = 'xama';
    usage = 'xama';
    description = 'XAAAAAAAAAAAAAAAAAMA';
    interactionOptions = [];
    async run(client, event) {
        const member = event.member;
        const xesques = await incXesques(member.id, member.user.username);
        if (xesques === 1) {
            return event.reply(`xamou no xesque pela primeira vez!`);
        }
        event.channel?.send(`Você xamou no xesque ${xesques} vezes !`);
    }
}
exports.XamaCommand = XamaCommand;
async function incXesques(id, username) {
    const user = (await User_1.default.findOne({ uid: id })) ||
        (await User_1.default.create({ uid: id, name: username, xesques: 0 }));
    user.xesques = user.xesques + 1;
    await user.save();
    return user.xesques;
}


/***/ }),

/***/ "./apps/discord-bot/src/Config/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.run = void 0;
const tslib_1 = __webpack_require__("tslib");
const dotenv_1 = (0, tslib_1.__importDefault)(__webpack_require__("dotenv"));
function run() {
    dotenv_1.default.config();
}
exports.run = run;


/***/ }),

/***/ "./apps/discord-bot/src/Database/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseConnection = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = (0, tslib_1.__importDefault)(__webpack_require__("mongoose"));
const ProvidersDecorators_1 = __webpack_require__("./apps/discord-bot/src/Providers/ProvidersDecorators.ts");
let DatabaseConnection = class DatabaseConnection {
    async init() {
        return mongoose_1.default
            .connect(`mongodb+srv://aqu1les:${process.env.DB_PASSWORD}@cluster0-kvfg5.mongodb.net/xororo?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => console.log('Connected to mongodb Atlas'));
    }
};
DatabaseConnection = (0, tslib_1.__decorate)([
    (0, ProvidersDecorators_1.Injectable)()
], DatabaseConnection);
exports.DatabaseConnection = DatabaseConnection;


/***/ }),

/***/ "./apps/discord-bot/src/Discord/Client.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DiscordClient = void 0;
const discord_js_1 = __webpack_require__("discord.js");
const CommandsManager_1 = __webpack_require__("./apps/discord-bot/src/Commands/CommandsManager.ts");
const Helpers_1 = __webpack_require__("./apps/discord-bot/src/Helpers/index.ts");
class DiscordClient {
    client = new discord_js_1.Client({
        intents: [
            discord_js_1.Intents.FLAGS.GUILDS,
            discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
            discord_js_1.Intents.FLAGS.GUILD_VOICE_STATES
        ]
    });
    get commandsManager() {
        return (0, Helpers_1.resolve)(CommandsManager_1.CommandsManager);
    }
    async login() {
        return this.client.login(process.env.DISCORD_SECRET);
    }
    setCommands() {
        this.client.guilds.cache.each((guild) => {
            this.client.application?.commands
                .set(this.commandsManager.forDiscord(), guild.id)
                .catch(console.error);
        });
    }
}
exports.DiscordClient = DiscordClient;


/***/ }),

/***/ "./apps/discord-bot/src/Discord/Events/EventsManager.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.eventsManager = void 0;
const Interaction_1 = __webpack_require__("./apps/discord-bot/src/Discord/Events/Interaction/index.ts");
const Message_1 = __webpack_require__("./apps/discord-bot/src/Discord/Events/Message/index.ts");
const Status_1 = __webpack_require__("./apps/discord-bot/src/Discord/Events/Status/index.ts");
const EVENTS_HANDLERS = {
    ...Interaction_1.INTERACTION_EVENTS_MAP,
    ...Message_1.MESSAGE_EVENTS_MAP,
    ...Status_1.STATUS_EVENTS_MAP
};
class EventsManager {
    register(client) {
        Object.entries(EVENTS_HANDLERS).forEach(([eventName, eventHandler]) => {
            client.on(eventName, (...args) => eventHandler.exec(client, ...args));
        });
    }
}
exports.eventsManager = new EventsManager();


/***/ }),

/***/ "./apps/discord-bot/src/Discord/Events/Interaction/InteractionCreate.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InteractionCreate = void 0;
const CommandsManager_1 = __webpack_require__("./apps/discord-bot/src/Commands/CommandsManager.ts");
const Helpers_1 = __webpack_require__("./apps/discord-bot/src/Helpers/index.ts");
class InteractionCreate {
    get commandsManager() {
        return (0, Helpers_1.resolve)(CommandsManager_1.CommandsManager);
    }
    async exec(client, interaction) {
        await Promise.all([this.runCommand(client, interaction)]);
    }
    async runCommand(client, interaction) {
        const command = interaction.commandName;
        const cmd = this.commandsManager.commands[command];
        if (!cmd)
            return;
        const args = cmd.interactionOptions
            .map(({ name }) => interaction.options.get(name)?.value)
            .filter((v) => !!v);
        try {
            if (cmd.validate) {
                await cmd.validate(client, interaction, args);
            }
            await cmd.run(client, interaction, args);
            if (cmd.success) {
                await cmd.success(client, interaction, args);
            }
        }
        catch (err) {
            console.error(err);
            if (cmd.error) {
                await cmd.error(client, interaction, args);
            }
        }
        finally {
            if (cmd.after) {
                await cmd.after(client, interaction, args);
            }
        }
    }
}
exports.InteractionCreate = InteractionCreate;


/***/ }),

/***/ "./apps/discord-bot/src/Discord/Events/Interaction/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.INTERACTION_EVENTS_MAP = void 0;
const InteractionCreate_1 = __webpack_require__("./apps/discord-bot/src/Discord/Events/Interaction/InteractionCreate.ts");
exports.INTERACTION_EVENTS_MAP = {
    interactionCreate: new InteractionCreate_1.InteractionCreate()
};


/***/ }),

/***/ "./apps/discord-bot/src/Discord/Events/Message/MessageCreate.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageCreate = void 0;
const CommandsManager_1 = __webpack_require__("./apps/discord-bot/src/Commands/CommandsManager.ts");
const Helpers_1 = __webpack_require__("./apps/discord-bot/src/Helpers/index.ts");
const commandPrefix = '!';
const commandPrefix2 = '/';
class MessageCreate {
    get commandsManager() {
        return (0, Helpers_1.resolve)(CommandsManager_1.CommandsManager);
    }
    async exec(client, event) {
        const member = event.member;
        if (member && 'bot' in member) {
            return;
        }
        const msg = ['Q', 'q', 'que', 'que?', 'q?', 'QUE'];
        msg.map((q) => {
            if (event.content.toLowerCase() === q) {
                event.channel.send('pau no seu cu :microphone: ');
            }
        });
        const test = event.content.substring(event.content.length - 2, event.content.length - 1);
        if (test === 'ão' && member?.user.username !== client.user?.username) {
            return event.channel.send('Meu pau na sua mão');
        }
        if (event.content
            .toLowerCase()
            .substring(event.content.length - 5, event.content.length - 1) ===
            'noite') {
            return event.channel.send('Boa noite corno');
        }
        await Promise.all([this.runCommand(client, event)]);
    }
    textIsCommand(text) {
        return text.startsWith(commandPrefix) || text.startsWith(commandPrefix2);
    }
    async runCommand(client, message) {
        const isCommand = this.textIsCommand(message.content);
        if (!isCommand)
            return;
        const msg = message.content;
        const args = msg.slice(1).trim().split(' ');
        args.shift();
        const command = msg.substring(1, msg.length).split(' ')[0];
        const cmd = this.commandsManager.commands[command];
        if (!cmd)
            return;
        try {
            if (cmd.validate) {
                await cmd.validate(client, message, args);
            }
            await cmd.run(client, message, args);
            if (cmd.success) {
                await cmd.success(client, message, args);
            }
        }
        catch (err) {
            console.error(err);
        }
        finally {
            if (cmd.after) {
                await cmd.after(client, message, args);
            }
        }
    }
}
exports.MessageCreate = MessageCreate;


/***/ }),

/***/ "./apps/discord-bot/src/Discord/Events/Message/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MESSAGE_EVENTS_MAP = void 0;
const MessageCreate_1 = __webpack_require__("./apps/discord-bot/src/Discord/Events/Message/MessageCreate.ts");
exports.MESSAGE_EVENTS_MAP = {
    messageCreate: new MessageCreate_1.MessageCreate()
};


/***/ }),

/***/ "./apps/discord-bot/src/Discord/Events/Status/Error.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Error = void 0;
class Error {
    async exec(client, error) {
        console.log(error);
    }
}
exports.Error = Error;


/***/ }),

/***/ "./apps/discord-bot/src/Discord/Events/Status/Ready.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Ready = void 0;
const CommandsManager_1 = __webpack_require__("./apps/discord-bot/src/Commands/CommandsManager.ts");
const Helpers_1 = __webpack_require__("./apps/discord-bot/src/Helpers/index.ts");
const environment = "development" ?? 0;
class Ready {
    get commandsManager() {
        return (0, Helpers_1.resolve)(CommandsManager_1.CommandsManager);
    }
    async exec(client) {
        console.log(`Logged in as ${client.user?.tag}!`);
        client.user?.setActivity(environment === 'local'
            ? 'meu dono fazer merda no meu código'
            : 'você comer o cu dos outros', {
            type: 'WATCHING'
        });
    }
}
exports.Ready = Ready;


/***/ }),

/***/ "./apps/discord-bot/src/Discord/Events/Status/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STATUS_EVENTS_MAP = void 0;
const Error_1 = __webpack_require__("./apps/discord-bot/src/Discord/Events/Status/Error.ts");
const Ready_1 = __webpack_require__("./apps/discord-bot/src/Discord/Events/Status/Ready.ts");
exports.STATUS_EVENTS_MAP = {
    ready: new Ready_1.Ready(),
    error: new Error_1.Error()
};


/***/ }),

/***/ "./apps/discord-bot/src/Features/play-on-voice-channel.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.playOnVoiceConnection = void 0;
const tslib_1 = __webpack_require__("tslib");
const ytdl_core_1 = (0, tslib_1.__importDefault)(__webpack_require__("ytdl-core"));
const embed_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/discord-bot/src/Adapters/embed.ts"));
const playlist_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/discord-bot/src/Features/playlist.ts"));
const playlist = (0, playlist_1.default)();
async function playOnVoiceConnection(connection, textChannel, guildId, author) {
    try {
        const music = playlist.getFirstMusic(guildId);
        const clientResponse = (0, embed_1.default)(`Vo toca essa braba aqui`, '#e80a21', music.title, music.link || music.url, music.thumbnail, {
            text: author?.username ?? 'aqu1les',
            icon: author?.avatarURL() || 'https://i.imgur.com/FYaQiTu.jpg'
        }, true);
        textChannel.send({ embeds: [clientResponse] });
        const playableData = (0, ytdl_core_1.default)(music.link || music.url, {
            filter: 'audio'
        });
        const dispatcher = connection.play(playableData);
        dispatcher.setVolume(1);
        dispatcher.on('error', (e) => {
            console.log(e);
        });
        dispatcher.on('end', () => {
            playlist.popMusic(guildId);
            if (playlist.getPlaylistLength(guildId) === 0) {
                return connection.disconnect();
            }
            playOnVoiceConnection(connection, textChannel, guildId, author);
        });
        connection.on('disconnect', () => {
            playlist.setPlaylist(guildId);
        });
    }
    catch (e) {
        connection.disconnect();
        connection.destroy(true);
        textChannel.send(`Deu algum erro aqui viado`);
        console.error(e);
    }
}
exports.playOnVoiceConnection = playOnVoiceConnection;


/***/ }),

/***/ "./apps/discord-bot/src/Features/playlist.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const channels = {};
function Player() {
    async function addMusic(music, guildId) {
        if (!channels[guildId])
            setPlaylist(guildId);
        channels[guildId].playlist.push(music);
    }
    function getFirstMusic(guildId) {
        return channels[guildId].playlist[0];
    }
    function popMusic(guildId) {
        channels[guildId].playlist.shift();
    }
    function getPlaylist(guildId) {
        return channels[guildId].playlist;
    }
    function setPlaylist(guildId) {
        if (!channels[guildId])
            channels[guildId] = {};
        channels[guildId].playlist = [];
    }
    function getPlaylistLength(guildId) {
        return channels[guildId].playlist.length;
    }
    return {
        addMusic,
        getFirstMusic,
        getPlaylist,
        setPlaylist,
        getPlaylistLength,
        popMusic
    };
}
exports["default"] = Player;


/***/ }),

/***/ "./apps/discord-bot/src/Helpers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerDependency = exports.resolve = void 0;
const ProvidersManager_1 = __webpack_require__("./apps/discord-bot/src/Providers/ProvidersManager.ts");
function resolve(dependency) {
    let instance = ProvidersManager_1.ProvidersManager.get(dependency.SERVICE_NAME);
    if (!instance) {
        registerDependency(dependency);
        instance = ProvidersManager_1.ProvidersManager.get(dependency.SERVICE_NAME);
    }
    return instance;
}
exports.resolve = resolve;
function registerDependency(dependency) {
    ProvidersManager_1.ProvidersManager.set(dependency.SERVICE_NAME, new dependency());
}
exports.registerDependency = registerDependency;


/***/ }),

/***/ "./apps/discord-bot/src/Helpers/voice-connection.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createVoiceConnection = exports.connectOnChannel = exports.isSameChannel = exports.botIsConnected = exports.memberIsOnVoiceChannel = void 0;
const voice_1 = __webpack_require__("@discordjs/voice");
const memberIsOnVoiceChannel = (member) => !!(member.voice && member.voice.channel);
exports.memberIsOnVoiceChannel = memberIsOnVoiceChannel;
const botIsConnected = (guild) => {
    const connection = (0, voice_1.getVoiceConnection)(guild.id);
    if (!connection) {
        return false;
    }
    return connection.state.status !== voice_1.VoiceConnectionStatus.Disconnected;
};
exports.botIsConnected = botIsConnected;
const isSameChannel = (channelA, channelB) => !!(channelA.id && channelB.id && channelA.id === channelB.id);
exports.isSameChannel = isSameChannel;
const connectOnChannel = async (channel, textChannel, message = 'entrei fodase') => {
    return await textChannel.send(message);
};
exports.connectOnChannel = connectOnChannel;
const createVoiceConnection = (channelId, guild) => {
    return (0, voice_1.joinVoiceChannel)({
        channelId,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator
    });
};
exports.createVoiceConnection = createVoiceConnection;


/***/ }),

/***/ "./apps/discord-bot/src/Model/User.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = (0, tslib_1.__importDefault)(__webpack_require__("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    uid: String,
    name: String,
    xesques: { type: Number, default: 0 },
    brabas: { type: Number, default: 0 },
    cus_comidos: { type: Array, default: [] }
});
exports["default"] = mongoose_1.default.model('user', UserSchema);


/***/ }),

/***/ "./apps/discord-bot/src/Providers/ProvidersDecorators.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Injectable = void 0;
const Helpers_1 = __webpack_require__("./apps/discord-bot/src/Helpers/index.ts");
function Injectable() {
    return function (InjectableClass) {
        InjectableClass.SERVICE_NAME = InjectableClass.name;
        (0, Helpers_1.resolve)(InjectableClass);
        return InjectableClass;
    };
}
exports.Injectable = Injectable;


/***/ }),

/***/ "./apps/discord-bot/src/Providers/ProvidersManager.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProvidersManager = void 0;
class _ProvidersManager {
    services = new Map();
    static instance;
    constructor() {
        if (_ProvidersManager.instance) {
            return _ProvidersManager.instance;
        }
        _ProvidersManager.instance = this;
    }
    get(key) {
        const matches = this.services.get(key);
        return matches;
    }
    set(key, dep) {
        this.services.set(key, dep);
    }
}
exports.ProvidersManager = new _ProvidersManager();


/***/ }),

/***/ "@discordjs/voice":
/***/ ((module) => {

module.exports = require("@discordjs/voice");

/***/ }),

/***/ "axios":
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "discord.js":
/***/ ((module) => {

module.exports = require("discord.js");

/***/ }),

/***/ "dotenv":
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "mongoose":
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "ytdl-core":
/***/ ((module) => {

module.exports = require("ytdl-core");

/***/ }),

/***/ "ytpl":
/***/ ((module) => {

module.exports = require("ytpl");

/***/ }),

/***/ "ytsr":
/***/ ((module) => {

module.exports = require("ytsr");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.App = void 0;
const Config_1 = __webpack_require__("./apps/discord-bot/src/Config/index.ts");
(0, Config_1.run)();
const Database_1 = __webpack_require__("./apps/discord-bot/src/Database/index.ts");
const CommandsManager_1 = __webpack_require__("./apps/discord-bot/src/Commands/CommandsManager.ts");
const EventsManager_1 = __webpack_require__("./apps/discord-bot/src/Discord/Events/EventsManager.ts");
const Client_1 = __webpack_require__("./apps/discord-bot/src/Discord/Client.ts");
const Helpers_1 = __webpack_require__("./apps/discord-bot/src/Helpers/index.ts");
class App {
    async init() {
        try {
            const commandsManager = (0, Helpers_1.resolve)(CommandsManager_1.CommandsManager);
            const databaseConnection = (0, Helpers_1.resolve)(Database_1.DatabaseConnection);
            const discordClient = new Client_1.DiscordClient();
            await Promise.all([
                commandsManager.load(),
                databaseConnection.init(),
                EventsManager_1.eventsManager.register(discordClient.client),
                discordClient.login()
            ]);
            discordClient.setCommands();
        }
        catch (error) {
            console.log('deu problema inicializando');
            console.error(error);
        }
    }
}
exports.App = App;
const app = new App();
app.init();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map