class SongInfo extends HTMLElement{
    constructor(){
        super();
    }
    set info(info){
        this._info = info;
        this.render();
    }
    connectedCallback(){
        this.render();
    }
    render(){
        this.innerHTML = `
                <section class="song-info">
                <h2 class="song-title">~~ ${this._info.full_title} ~~</h2>
                <div class="song-description">
                    <img src="${this._info.poster}" alt="song-poster">
                    <div class="song-detail">
                        <label>Title</label>
                        <p>${this._info.title}</p>
                        <label>Album</label>
                        <p>${this._info.album}</p>
                        <label>Artist</label>
                        <p>${this._info.artist}</p>
                        <label>Release Date</label>
                        <p>${this._info.release_date}</p>
                    </div>
                </div>
                <div class="song-lyrics">
                    ${this._info.lyrics}
                </div>
            </section>
        `
    }
}

customElements.define('song-info',SongInfo);