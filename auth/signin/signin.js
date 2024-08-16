import{getAuth,
     signInWithEmailAndPassword}
from "../../main.js"

const auth = getAuth();


const login_email = document.getElementById('login_email')
const login_password = document.getElementById('login_password')
const signin_btn = document.getElementById('signin_btn')


signin_btn.addEventListener('click', function(){
    if(!login_email.value || !login_password.value){
        alert('fill all field')
    }
    else{

        signInWithEmailAndPassword(auth, login_email.value, login_password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('login Successfully');
            window.location.href="../../my_profile/index.html" //move to user profile page
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });

    }


})//end of signin event