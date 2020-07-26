const ytsr = require('ytsr');
const ytpl = require('ytpl');

module.exports = {
  search: async (keyword) => {
    const response = await ytsr(keyword);
    const musics = response.items.filter((item) => item.type === 'video');
    return musics[0];
  },
  fetchPlaylist: async (playlistLink) => {
    const result = await ytpl(playlistLink);
    return result.items;
  },
  validateURL: (url) => ytpl.validateURL(url)
};
