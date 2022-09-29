import './song-item.js';

class SongList extends HTMLElement{
    constructor(){
        super();
    }
    set songs(songs){
        this._songs = songs;
        this.render();
    }
    get listElement(){
        return this;
    }
    render(){
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
        this._songs.forEach(song => {
            const songItem = document.createElement('song-item');
            songItem.song = song;
            this.appendChild(songItem);
        });
    }
    renderError(message){
        this.innerHTML = ``;
        this.innerHTML += `
            <style>
                .error-message {
                    height: 300px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: red;
                }
            </style>
            <div class='error-message'>
                <h2 class="placeholder">${message}</h2>
            </div>
        `;
    }
}

customElements.define('song-list',SongList);