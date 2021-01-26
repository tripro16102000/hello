const style = `
.item-container{
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
    border-radius: 10px
}
.author{
    font-size: 25px;
    font-family: Florence, cursive
}   

.content{
    font-size:20px;
    font-family: "Courier New", Courier, monospace;
}
.createdAt{
    font-size:10px
}
.item-container img{
    height: 50%;
    width: 50%
}
`

class PostItem extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: "open" })
        this.content = this.getAttribute('content')
        this.authorName = this.getAttribute('author-name')
        this.image = this.getAttribute('image')
        let imgElm = ''
        if (this.image) {
            imgElm = `<img src="${this.image}"/>`
        }
        this._shadowDom.innerHTML = `
    
            <style>
            ${style}
            </style>

        <div class="item-container">
    
        <div class="author-name">${this.authorName}</div>
        <div class="content">${this.content}</div>
        <div class="image"> ${imgElm} </div>
        
        
        </div>
        `
    }
    static get observedAttributes() {
        return ['image', 'author-name', 'content']
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "author-name") {
            this._shadowDom.querySelector('.author-name').innerHTML = newValue
        }
        if (name === "content") {
            this._shadowDom.querySelector('.content').innerHTML = newValue
        }
        if (name === "image") {
            this._shadowDom.querySelector('.image').innerHTML = `<img src="${newValue}">`
        }
    }

}

// abc
window.customElements.define('post-item', PostItem) 
