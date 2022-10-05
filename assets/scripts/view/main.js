import '../components/song-shelf';
import '../components/song-list';
import '../components/song-info';
import '../components/search-bar';
import '../components/error-message';
import DataSource from '../data/data-source';

const main = () => {
  const mainElement = document.querySelector('main');
  const searchElement = document.querySelector('search-bar');
  const container = document.querySelector('.container');

  const renderMain = (element) => {
    mainElement.innerHTML = '';
    mainElement.appendChild(element);
  };
  const renderError = (message, category = 'Hasil Pencarian') => {
    const errorElement = document.createElement('error-message');
    errorElement.setAttribute('msg', message);
    errorElement.setAttribute('category', category);
    renderMain(errorElement);
    container.classList.remove('active');
  };
  const renderSongInfo = (songData) => {
    const songInfoElement = document.createElement('song-info');
    songInfoElement.info = songData;
    renderMain(songInfoElement);
    container.classList.remove('active');
  };
  const setSongItemEvent = () => {
    const songItems = document.querySelectorAll('.song-item');
    songItems.forEach((songItem) => {
      songItem.addEventListener('click', async () => {
        container.classList.add('active');
        try {
          const songData = await DataSource.getSongInfo(songItem.dataset.target);
          songData.lyrics = await DataSource.getSongLyrics(songItem.dataset.target);
          renderSongInfo(songData);
        } catch (error) {
          renderError('API Key telah mencapai batas pemakaian. Harap ganti dengan yang baru !', 'API Error');
        }
      });
    });
  };
  const renderRecommended = (songs) => {
    const songShelfSection = document.querySelector('.song-shelf');
    const songListElement = document.querySelector('song-list');
    songListElement.songs = songs;
    songShelfSection.appendChild(songListElement);
    setSongItemEvent();
    container.classList.remove('active');
  };
  const renderResult = (songs) => {
    const shelfElement = document.createElement('song-shelf');
    shelfElement.setAttribute('subtitle', 'Hasil Pencarian');
    renderMain(shelfElement);

    const songListElement = document.querySelector('song-list');
    songListElement.songs = songs;
    shelfElement.querySelector('.song-shelf').appendChild(songListElement);
    setSongItemEvent();
    container.classList.remove('active');
  };
  const searchSongs = () => {
    container.classList.add('active');
    DataSource.searchSongs(searchElement.inputValue)
      .then(renderResult)
      .catch(renderError);
  };
  const loadRecommended = () => {
    DataSource.recommended()
      .then(renderRecommended)
      .catch(renderError);
  };

  searchElement.clickEvent = searchSongs;
  loadRecommended();
};

export default main;
