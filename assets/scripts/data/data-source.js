import songs from "../data/song-data.js";

class DataSource{
    static options(){
        return {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '6d0cb63a54msh1976866a08f8270p13ebcajsnfd8b1a9a4c49',
                'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
            }
        }
    }
    static recommended(){
        return new Promise((resolve,reject) => {
            if(songs.length){
                resolve(songs);
            }else{
                reject("Tidak Ada Rekomendasi");
            }
        });
    }
    static searchSongs(keyword){
        return fetch(`https://genius-song-lyrics1.p.rapidapi.com/search?q=${keyword}&per_page=30&page=1`, this.options())
        .then(response => response.json())
        .then(response => {
            const songs = response.response.hits.map(song => {
                return {
                    id: song.result.id,
                    title: song.result.title,
                    artists: song.result.artist_names,
                    cover: song.result.header_image_url
                }
            });
            return songs;
        })
    }
    static getSongInfo(songId){
        return fetch(`https://genius-song-lyrics1.p.rapidapi.com/songs/${songId}`, this.options())
        .then(response => response.json())
        .then(response => {
            const songData = response.response.song;
            const songInfo = {
                full_title: songData.full_title,
                title: songData.title,
                poster: songData.header_image_url,
                album: songData.tracking_data[4].value || "<i><font color='red'>unknown</font></i>",
                artist: songData.artist_names,
                release_date: songData.tracking_data[17].value || "<i><font color='red'>unknown</font></i>"
            }
            return songInfo;
        })
        .catch(err => console.error(err));
    }
    static getSongLyrics(songId){
        return fetch(`https://genius-song-lyrics1.p.rapidapi.com/songs/${songId}/lyrics`, this.options())
        .then(response => response.json())
        .then(response => {
            const lyricsText = response.response.lyrics.lyrics.body.html;
            return lyricsText;
        })
        .catch(err => console.error(err));
    }
}

export default DataSource;