
import { redirect } from "../index.js"
import {emailValid} from "../utility.js"
class LoginScreen extends HTMLElement {
    constructor(){
        super()
        this._shadowRoot = this.attachShadow({mode:"open"})
        this._shadowRoot.innerHTML = `
        
        <form id="login-form">
<div class="title">
    Share story
</div>
<img src="https://www.logolynx.com/images/logolynx/3c/3c8f7f52261ef898a736518a782b4028.png" alt="" srcset="">

<input-wrapper id="email" type="email" placeholder="Email"></input-wrapper>
<div class = "error"></div>
</div><div>
<input-wrapper id="pass" type="password" placeholder="Password"></input-wrapper>
<div class = "error"></div>
</div><div>
<button class="btn">Login</button>
<div id="redirect">Dont have account ? Register</div>
</form>
    
<style>
    
#login-form{
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
#login-form img{
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
            redirect('register')
        })
        this._shadowRoot.getElementById('login-form')
        .addEventListener('submit', (e) => {
            e.preventDefault()
         
           const email = this._shadowRoot.getElementById('email').value
           const pass = this._shadowRoot.getElementById('pass').value
           
           let isValid = true
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

           
            
if (isValid){
    firebase.auth().signInWithEmailAndPassword(email,pass)
    .then((res) =>{
        console.log(res)
        if(!res.user.emailVerified){
            alert('Please verify email')
            return
        }
        const user = {
            email: res.user.email,
            displayName: res.user.displayName,
            id: res.user.uid
        }

        window.currentUser = user
        redirect('story')
    })
    .catch((err) =>{
        alert(err.message)
    })
}
        })

        
    }  
    
}
window.customElements.define('login-screen',LoginScreen)