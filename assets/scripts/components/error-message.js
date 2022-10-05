class ErrorMessage extends HTMLElement {
  connectedCallback() {
    this.message = this.getAttribute('msg') || 'Tidak ada koneksi internet';
    this.category = this.getAttribute('category');
    this.render();
  }

  render() {
    this.innerHTML = `
          <style>
              .error-box{
                  width: 100%;
              }
              .error-box h1{
                  margin-bottom: 10px;
                  font-size: 1.5rem;
              }
              .error-box hr{
                  padding: 1px;
                  border-radius: 5px;
                  background-color: grey;
              }
              .error-message {
                  height: 500px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  color: red;
              }
              @media(max-width: 500px){
                  .error-box h1{
                      font-size: 1.3rem;
                  }
              }
          </style>
          <div class="error-box">
              <h1>${this.category}</h1>
              <hr>
              <div class="error-message">
                  <h2>${this.message}</h2>
              </div>
          </div>
      `;
  }
}

customElements.define('error-message', ErrorMessage);
