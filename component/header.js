
class Header extends HTMLElement{
    constructor(){
        super()
        this._shadowDom = this.attachShadow({mode:"open"})
        this._shadowDom.innerHTML = `
        <style>
     .header{
        display: flex;
        justify-content: space-between;
        height: 80px;
        background: Cornsilk;
        align-items: center;
        padding: 0 50px;
        font-size: 30px
     }

     .header img{
         height: 100px;
         width: 100px

     }
        </style>
   
        <div class="header">
  <div><img src="https://www.logolynx.com/images/logolynx/3c/3c8f7f52261ef898a736518a782b4028.png" alt="" srcset=""></div>
  
  <div>
  <div>Avatar</div>
  <div><button>Logout</button></div>
  </div>

</div>
        `
       
    }
}

window.customElements.define('story-header', Header)