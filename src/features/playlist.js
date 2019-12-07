class Playlist {
    playlist = [];
    addMusic(music) {
        this.playlist.push(music);
    }
    getFirstMusic() {
        return this.playlist.shift();
    }
    setPlaylist() {
        this.playlist = [];
        this.playlist.length = 0;
    }
    getLength() {
        return this.playlist.length;
    }
}
module.exports = new Playlist();