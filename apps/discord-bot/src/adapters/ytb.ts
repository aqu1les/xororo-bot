import ytsr from 'ytsr';
import ytpl from 'ytpl';

export default {
  search: async (keyword: string) => {
    const response = await ytsr(keyword);
    const musics = response.items.filter((item) => item.type === 'video');
    return musics[0];
  },
  fetchPlaylist: async (playlistLink: string) => {
    const result = await ytpl(playlistLink);
    return result.items;
  },
  validateURL: youtubeParser
};

function youtubeParser(url: string): string | boolean {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[7].length == 11 ? match[7] : false;
}
