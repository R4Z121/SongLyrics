import '../components/song-shelf.js';
import '../components/song-list.js';
import '../components/song-info.js';
import '../components/search-bar.js';
import DataSource from "../data/data-source.js";

const main = () => {
    const mainElement = document.querySelector('main');
    const searchElement = document.querySelector('search-bar');

    const searchSongs = () => {
        DataSource.searchSongs(searchElement.inputValue)
        .then(results => {
            if(results.length){
                renderResult(results);
            }else{
                fallbackResult('Tidak ada hasil ditemukan');
            }
        })
        .catch(fallbackResult);
    }
    const loadRecommended = () => {
        DataSource.recommended()
        .then(renderRecommended)
        .catch(fallbackResult);
    };
    const renderResult = songs => {
        const shelfElement = document.createElement('song-shelf');
        shelfElement.setAttribute('subtitle','Hasil Pencarian');
        renderMain(shelfElement);

        const songListElement = document.querySelector('song-list');
        songListElement.songs = songs;
        shelfElement.querySelector('.song-shelf').appendChild(songListElement);
        setSongItemEvent();
    }
    const renderRecommended = songs => {
        const songShelfSection = document.querySelector('.song-shelf');
        const songListElement = document.querySelector('song-list');
        songListElement.songs = songs;
        songShelfSection.appendChild(songListElement);
        setSongItemEvent();
    };
    const renderSongInfo = songData => {
        const songInfoElement = document.createElement('song-info');
        songInfoElement.info = songData;
        renderMain(songInfoElement);
    }
    const renderMain = element => {
        mainElement.innerHTML = '';
        mainElement.appendChild(element);
    }
    const fallbackResult = message => {
        songListElement.renderError(message);
    }
    const setSongItemEvent = () => {
        const songItems = document.querySelectorAll('.song-item');
        songItems.forEach(songItem => {
            songItem.addEventListener('click', async () => {
                const songData = await DataSource.getSongInfo(songItem.dataset.target);
                songData.lyrics = await DataSource.getSongLyrics(songItem.dataset.target);
                renderSongInfo(songData);
            });
        });
    }
    
    searchElement.clickEvent = searchSongs;
    loadRecommended();

}

export default main;