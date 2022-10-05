import songs from './song-data';

class DataSource {
  static options() {
    return {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'YOUR_KEY',
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
      },
    };
  }

  static recommended() {
    return new Promise((resolve, reject) => {
      if (songs.length) {
        resolve(songs);
      } else {
        const rejectionReason = 'Tidak Ada Rekomendasi';
        reject(rejectionReason);
      }
    });
  }

  static searchSongs(keyword) {
    return fetch(`https://genius-song-lyrics1.p.rapidapi.com/search?q=${keyword}&per_page=30&page=1`, this.options())
      .then((response) => response.json())
      .then((response) => {
        if (response.response.hits.length) {
          const results = response.response.hits.map((song) => ({
            id: song.result.id,
            title: song.result.title,
            artists: song.result.artist_names,
            cover: song.result.header_image_url,
          }));
          return Promise.resolve(results);
        }
        const rejectionReason = `${keyword} tidak ditemukan`;
        return Promise.reject(rejectionReason);
      })
      .catch((error) => Promise.reject(error));
  }

  static getSongInfo(songId) {
    return fetch(`https://genius-song-lyrics1.p.rapidapi.com/songs/${songId}`, this.options())
      .then((response) => response.json())
      .then((response) => {
        const songData = response.response.song;
        const songInfo = {
          full_title: songData.full_title,
          title: songData.title,
          poster: songData.header_image_url,
          album: songData.tracking_data[4].value || "<i><font color='red'>unknown</font></i>",
          artist: songData.artist_names,
          release_date: songData.tracking_data[17].value || "<i><font color='red'>unknown</font></i>",
        };
        return songInfo;
      })
      .catch((error) => Promise.reject(error));
  }

  static getSongLyrics(songId) {
    return fetch(`https://genius-song-lyrics1.p.rapidapi.com/songs/${songId}/lyrics`, this.options())
      .then((response) => response.json())
      .then((response) => {
        const lyricsText = response.response.lyrics.lyrics.body.html;
        return lyricsText;
      })
      .catch((error) => Promise.reject(error));
  }
}

export default DataSource;
