import { redirect } from "../index.js"
import {emailValid} from "../utility.js"

class RegisterScreen extends HTMLElement{
    constructor(){
        super()
        this._shadowRoot = this.attachShadow({mode:"open"})
        this._shadowRoot.innerHTML = `
        <form id="register-form">
<div class="title">
    Share story
</div>
<img src="https://www.logolynx.com/images/logolynx/3c/3c8f7f52261ef898a736518a782b4028.png" alt="" srcset="">
<input-wrapper id="name" type="text" placeholder="Full name"></input-wrapper>
<div class = "error"></div>
<div>
<input-wrapper id="email" type="email" placeholder="Email"></input-wrapper>
<div class = "error"></div>
</div><div>
<input-wrapper id="pass" type="password" placeholder="Password"></input-wrapper>
<div class = "error"></div>
</div><div>
<input-wrapper id="confirm-pass" type="password" placeholder="Confirm password"></input-wrapper>
<div class = "error"></div>
</div>
<button class="btn">Register</button>
<div id="redirect">Already have an account ? Login</div>
</form>
    </div>
    <style>
    
    #register-form{
        width: 20%;
        margin: auto;
        background-color: pink;
        text-align: center;
        margin-top: 60px;
        padding-top: 3%;
        height: 100%;
        font-size: 30px;
        border: 1px solid black
    }
    .title{
        font-size: 30px;
        font-family: fantasy;
        
    }
    #register-form img{
        height: 100px;
        width : 100px
    }
    
    #redirect{
        font-size: 15px;
        text-decoration: underline;
        
    }
    </style>
  
        `
        this._shadowRoot.getElementById('redirect')
        .addEventListener('click', ()=>{
            redirect('login')
        })
        this._shadowRoot.getElementById('register-form')
        .addEventListener('submit', (e) => {
            e.preventDefault()
         
            const name = this._shadowRoot.getElementById('name').value
           const email = this._shadowRoot.getElementById('email').value
           const pass = this._shadowRoot.getElementById('pass').value
           const confirmPass = this._shadowRoot.getElementById('confirm-pass').value
           //fullname
           let isValid = true
           if (name.trim() === ''){
               this._shadowRoot.getElementById('name')
               .setAttribute('error','Please input full name')
               isValid = false
           } else {
            this._shadowRoot.getElementById('name')
            .setAttribute('error','')
           }
           //email
           if (email.trim() === ''){
            this._shadowRoot.getElementById('email')
            .setAttribute('error','Please input your email')
            isValid = false
        }
            else if(emailValid(email) === false){
                this._shadowRoot.getElementById('email')
            .setAttribute('error','Email does not valid')
            isValid = false

        }
            else {
                this._shadowRoot.getElementById('email')
            .setAttribute('error','')
            }
            //pass
            if (pass.trim() === ''){
                this._shadowRoot.getElementById('pass')
                .setAttribute('error','Please input password')
                isValid = false

            } else {
             this._shadowRoot.getElementById('pass')
             .setAttribute('error','')
            }

            //confirm pass
            if (confirmPass.trim() === ''){
                this._shadowRoot.getElementById('confirm-pass')
                .setAttribute('error','Please confirm password')
                isValid = false
            }
                else if(confirmPass !== pass){
                    this._shadowRoot.getElementById('confirm-pass')
                    .setAttribute('error','Password not match')
                    isValid = false

                }
             else {
             this._shadowRoot.getElementById('confirm-pass')
             .setAttribute('error','')
            }
if (isValid){
    firebase.auth().createUserWithEmailAndPassword(email,pass)
    .then((res) =>{
        alert('register successed')
        firebase.auth().currentUser.sendEmailVerification()
        firebase.auth().currentUser.updateProfile({
            displayName: name
        })
        redirect('login')
    })
    .catch((err) =>{
        alert(err.message)
    })
}
        })

        
    }
    
}
    window.customElements.define('register-screen',RegisterScreen)
