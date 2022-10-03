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
                #search-field{
                    width: 100%;
                    padding: 10px;
                    font-size: 15px;
                    outline: none;
                    border: none;
                    border-radius: 4px;
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
                    border-radius: 4px;
                    min-width: 70px;
                }
                @media(max-width: 550px){
                    #search-field, #search-button{
                        font-size: 13px;
                    }
                }
            </style>
            <div class="search-bar">
                <input id="search-field" type="text" placeholder="Search songs, albums, artists">
                <button id='search-button' class="btn" type='submit'>Cari</button>
            </div>
        `;
        this._shadowRoot.querySelector('#search-button').addEventListener('click', this._clickEvent);
        this._shadowRoot.querySelector('#search-field').addEventListener('keyup',event => {
            if(event.keyCode == 13){
                this._shadowRoot.querySelector('#search-button').click();
            }
        });
    }
}

customElements.define('search-bar',SearchBar)