/* eslint-disable no-underscore-dangle */
class SongItem extends HTMLElement {
  set song(song) {
    this._song = song;
    this.render();
  }

  render() {
    this.innerHTML = `
          <style>
              song-item{
                  display:block;
                  height: 200px;
                  background-color: white;
                  border-radius: 7px;
                  overflow: hidden;
                  position: relative;
                  color: white;
                  transition: box-shadow 0.5s;
              }
              song-item:hover{
                  cursor: pointer;
                  box-shadow: 1px 1px 10px 2px black;
              }
              .song-item img{
                  width: 100%;
                  height: 100%;
              }
              .description{
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  background-color: rgba(0, 0, 0, 0.5);
                  padding: 10px;
                  text-align: center;
              }
          </style>
          <div class="song-item" data-target="${this._song.id}">
              <img src='${this._song.cover}' alt='song-poster'>
              <div class="description">
                  <p>${this._song.title}</p>
                  <p>(${this._song.artists})</p>
              </div>
          </div>
      `;
  }
}

customElements.define('song-item', SongItem);
