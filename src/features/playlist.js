module.exports = function Player() {
    const channels = {};

    async function addMusic(music, guildId) {
        if (!channels[guildId]) setPlaylist(guildId);
        channels[guildId].playlist.push(music);
    }

    function getFirstMusic(guildId) {
        return channels[guildId].playlist.shift();
    }

    function getPlaylist(guildId) {
        return channels[guildId].playlist;
    }

    function setPlaylist(guildId) {
        if (!channels[guildId]) channels[guildId] = {};
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
    };
};
