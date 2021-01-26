
class StoryScreen extends HTMLElement{
    constructor(){
        super()
        this._shadowRoot = this.attachShadow({mode:"open"})
        this._shadowRoot.innerHTML = `
        <story-header></story-header>
        <create-post></create-post>
        <list-post></list-post>
        <style>
        *{
            font-size: 50px

        }
        </style>
        
        `
    }
  
    


}

window.customElements.define('story-screen',StoryScreen)