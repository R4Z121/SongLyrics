import './search-bar';

class AppCarousel extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
          <style>
              app-carousel{
                  display: block;
              }
              .carousel{
                  width: 100%;
                  height: 100vh;
                  position: relative;
              }
              .carousel::after{
                  content:"";
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background-color: rgba(0, 0, 0, 0.5);
              }
              .carousel img{
                  width: 100%;
                  height: 100%;
              }
              .carousel-caption{
                  position: absolute;
                  top: 0;
                  left: 0;
                  display: flex;
                  flex-direction: column;
                  z-index: 100;
                  width: 100%;
                  height: 100%;
                  justify-content: center;
                  align-items: center;
                  color: white;
                  padding: 20px;
                  gap: 20px;
              }
              .carousel-title{
                  font-size: 2.5rem;
                  text-align: center;
              }
              @media(max-width: 550px){
                  .carousel-title{
                      font-size: 1.5rem;
                  }
              }
          </style>
          <div class="carousel">
              <img id='carouselImg' alt="...">
              <div class="carousel-caption">
                  <h2 class="carousel-title">Temukan Lirik Lagu Favorit Kamu Disini</h2>
                  <search-bar></search-bar>
              </div>
          </div>
      `;
  }
}

customElements.define('app-carousel', AppCarousel);
