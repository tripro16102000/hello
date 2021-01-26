class InputWrapper extends HTMLElement{
    constructor(){
        super()
        this._shadowDom = this.attachShadow({mode:"open"})
        this.type = this.getAttribute('type')
        this.placeholder = this.getAttribute('placeholder')
        this.error = this.getAttribute('error')
        
        this._shadowDom.innerHTML = `
        <style>
        .error{
            color: red;
            font-size: 15px
        }
        </style>
        <div>
    <input type="${this.type}" placeholder="${this.placeholder}">
    <div class="error"></div>
</div>


        `
       
    }
//
static get observedAttributes(){
    return ['error']
}

    //
    attributeChangedCallback(name, oldValue , newValue){
        if(name === 'error'){
            this._shadowDom.querySelector('.error').innerText = newValue
        }
        console.log(name)
        console.log(oldValue)
        console.log(newValue)
    }
    get value(){
        return this._shadowDom.querySelector('input').value
    }

    set value(value){
        return this._shadowDom.querySelector('input').value = value
    }

    setErr(err) {
        this._shadowDom.querySelector('.error').innerText = err
    }
}
window.customElements.define('input-wrapper', InputWrapper)