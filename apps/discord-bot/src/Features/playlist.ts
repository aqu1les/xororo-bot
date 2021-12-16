const channels: any = {};

export default function Player() {
  async function addMusic(music: any, guildId: any) {
    if (!channels[guildId]) setPlaylist(guildId);
    channels[guildId].playlist.push(music);
  }

  function getFirstMusic(guildId: any) {
    return channels[guildId].playlist[0];
  }

  function popMusic(guildId: any) {
    channels[guildId].playlist.shift();
  }

  function getPlaylist(guildId: any) {
    return channels[guildId].playlist;
  }

  function setPlaylist(guildId: any) {
    if (!channels[guildId]) channels[guildId] = {};
    channels[guildId].playlist = [];
  }

  function getPlaylistLength(guildId: any) {
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
