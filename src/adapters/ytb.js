const ytsr = require('ytsr');
const ytpl = require('ytpl');

/**
 *
 */
const ytbAdapter = {
  /**
   *
   * @param {string} keyword
   * @returns
   */
  search: async (keyword) => {
    const response = await ytsr(keyword);
    const musics = response.items.filter((item) => item.type === 'video');
    return musics[0];
  },
  /**
   *
   * @param {string} playlistLink
   * @returns
   */
  fetchPlaylist: async (playlistLink) => {
    const result = await ytpl(playlistLink);
    return result.items;
  },
  validateURL: youtubeParser
};

module.exports = ytbAdapter;

/**
 *
 * @param {string} url
 * @returns {string}]
 */
function youtubeParser(url) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[7].length == 11 ? match[7] : false;
}
