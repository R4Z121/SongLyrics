class SongShelf extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        this.subtitle = this.getAttribute('subtitle');
        this.render();
    }
    render(){
        this.innerHTML = `
            <style>
                song-shelf{
                    display: block;
                }
                section{
                    margin-bottom: 20px;
                }
                section h1{
                    margin-bottom: 10px;
                }
                section hr{
                    padding: 1px;
                    border-radius: 5px;
                    background-color: grey;
                }
            </style>
            <section class="song-shelf">
                <h1>${this.subtitle}</h1>
                <hr>
                <song-list></song-list>
            </section>
        `
    }
}

customElements.define('song-shelf',SongShelf);