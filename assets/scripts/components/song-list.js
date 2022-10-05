/* eslint-disable no-underscore-dangle */
import './song-item';

class SongList extends HTMLElement {
  set songs(songs) {
    this._songs = songs;
    this.render();
  }

  get listElement() {
    return this;
  }

  render() {
    this.innerHTML = `
        <style>
            song-list {
                display: grid;
                grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
                padding: 15px;
                gap: 15px;
            }
        </style>
    `;
    this._songs.forEach((song) => {
      const songItem = document.createElement('song-item');
      songItem.song = song;
      this.appendChild(songItem);
    });
  }
}

customElements.define('song-list', SongList);
