import { getDataFromDocs } from '../utility.js'

import {getDataFromDoc} from '../utility.js'
const style = `
.container{
  width: 60%;
  margin: auto;
}

`
class ListPost extends HTMLElement {
  constructor() {
    super();
    this._shadowDom = this.attachShadow({ mode: "open" });
    this.renderHtml()
    this.listenChange()

  }
  async renderHtml() {
    const res = await firebase.firestore().collection('post').get()
    this.listPost = getDataFromDocs(res.docs)
    let html = ''
    for (const item of this.listPost) {
      html += `<post-item content="${item.content}" author-name="${item.authorName}"  image ="${item.image ? item.image : ""}"></post-item>
 
      
      
      
      `
    }

    this._shadowDom.innerHTML = `
    <style>
    ${style}
    </style>
<div class="container">
    ${html}
    </div>
    
    
    `;

  }
  listenChange(){
    let firstRun = true 
    firebase.firestore().collection('post').onSnapshot((snapShot)=>{
      if(firstRun){
        firstRun = false;
        return
      }
      for (const change of snapShot.docChanges()) {
        const docChange = getDataFromDoc(change.doc)

        if(change.type === 'added'){
          const postItemElm = document.createElement('post-item')
          postItemElm.setAttribute('content', docChange.content)
          postItemElm.setAttribute('author-name', docChange.authorName)
          
          postItemElm.setAttribute('image', docChange.image ? docChange.image : "")
          this._shadowDom.querySelector('.container').appendChild(postItemElm)
        }
      }
    })
  }
}




window.customElements.define("list-post", ListPost);
