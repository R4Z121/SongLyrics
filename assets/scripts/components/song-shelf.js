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
                .song-shelf{
                    margin-bottom: 20px;
                    min-height: 500px;
                }
                .song-shelf h1{
                    margin-bottom: 10px;
                    font-size: 1.5rem;
                }
                .song-shelf hr{
                    padding: 1px;
                    border-radius: 5px;
                    background-color: grey;
                }
                @media(max-width: 500px){
                    .song-shelf h1{
                        font-size: 1.3rem;
                    }
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