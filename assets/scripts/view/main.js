import '../components/song-shelf.js';
import '../components/song-list.js';
import '../components/song-info.js';
import '../components/search-bar.js';
import '../components/error-message.js';
import DataSource from "../data/data-source.js";

const main = () => {
    const mainElement = document.querySelector('main');
    const searchElement = document.querySelector('search-bar');
    const container = document.querySelector('.container');

    const searchSongs = () => {
        container.classList.add('active');
        DataSource.searchSongs(searchElement.inputValue)
        .then(renderResult)
        .catch(renderError);
    }
    const loadRecommended = () => {
        DataSource.recommended()
        .then(renderRecommended)
        .catch(renderError);
    };
    const renderResult = songs => {
        const shelfElement = document.createElement('song-shelf');
        shelfElement.setAttribute('subtitle','Hasil Pencarian');
        renderMain(shelfElement);

        const songListElement = document.querySelector('song-list');
        songListElement.songs = songs;
        shelfElement.querySelector('.song-shelf').appendChild(songListElement);
        setSongItemEvent();
        container.classList.remove('active');
    }
    const renderRecommended = songs => {
        const songShelfSection = document.querySelector('.song-shelf');
        const songListElement = document.querySelector('song-list');
        songListElement.songs = songs;
        songShelfSection.appendChild(songListElement);
        setSongItemEvent();
        container.classList.remove('active');
    };
    const renderSongInfo = songData => {
        const songInfoElement = document.createElement('song-info');
        songInfoElement.info = songData;
        renderMain(songInfoElement);
        container.classList.remove('active');
    }
    const renderMain = element => {
        mainElement.innerHTML = '';
        mainElement.appendChild(element);
    }
    const renderError = (message,category="Hasil Pencarian") => {
        const errorElement = document.createElement('error-message');
        errorElement.setAttribute('msg',message);
        errorElement.setAttribute('category',category);
        renderMain(errorElement);
        container.classList.remove('active');
    }
    const setSongItemEvent = () => {
        const songItems = document.querySelectorAll('.song-item');
        songItems.forEach(songItem => {
            songItem.addEventListener('click', async () => {
                container.classList.add('active');
                try {
                    const songData = await DataSource.getSongInfo(songItem.dataset.target);
                    songData.lyrics = await DataSource.getSongLyrics(songItem.dataset.target);
                    renderSongInfo(songData);
                } catch (error) {
                    renderError('API Key telah mencapai batas pemakaian. Harap ganti dengan yang baru !','API Error');
                }
            });
        });
    }
    
    searchElement.clickEvent = searchSongs;
    loadRecommended();

}

export default main;