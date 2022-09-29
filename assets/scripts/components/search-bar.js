class SearchBar extends HTMLElement{
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({mode: 'open'});
    }
    connectedCallback(){
        this.render();
    }
    set clickEvent(event){
        this._clickEvent = event;
        this.render();
    }
    get inputValue(){
       return this._shadowRoot.querySelector('#search-field').value;
    }
    render(){
        this._shadowRoot.innerHTML = `
            <style>
                :host{
                    display: flex;
                    width: 100%;
                    justify-content: center;
                }
                .search-bar{
                    width: 100%;
                    max-width: 550px;
                    display: flex;
                    gap: 7px;
                }
                .search-bar input{
                    width: 100%;
                    padding: 10px;
                    font-size: 15px;
                    outline: none;
                    border: none;
                    border-radius: 7px;
                }
                button{
                    border: none;
                    outline: none;
                }
                button:hover{
                    cursor: pointer;
                }
                .btn{
                    padding: 10px;
                    border-radius: 7px;
                    min-width: 70px;
                }
            </style>
            <div class="search-bar">
                <input id="search-field" type="text" placeholder="Search songs, albums, artists">
                <button id='searchButton' class="btn">Cari</button>
            </div>
        `;
        this._shadowRoot.querySelector('#searchButton').addEventListener('click', this._clickEvent);
    }
}

customElements.define('search-bar',SearchBar)