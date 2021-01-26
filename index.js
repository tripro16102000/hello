import './screen/register-screen.js'

import './component/input-wrapper.js'

import './screen/login-screen.js'

import './screen/story-screen.js'

import './component/header.js'

import './component/create-post.js'

import './component/list-post.js'

import './component/post-item.js'


export function redirect(screenName){
if (screenName === 'login'){
    document.querySelector('#app').innerHTML = `
    <login-screen></login-screen>
    `
}else if (screenName === 'register'){
    document.querySelector('#app').innerHTML = `
    <register-screen></register-screen>
    `
}else if (screenName === 'story'){
    document.querySelector('#app').innerHTML = `
    <story-screen></story-screen>
    `
}
}

firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        if(!user.emailVerified){
            alert('Please verify email')
            redirect('login')
            return
        }else{
             window.currentUser = {
                id: user.uid,
                email: user.email,
                displayName: user.displayName
            }
            redirect('story')
            
        }
    }else{
redirect('login')
    }
})