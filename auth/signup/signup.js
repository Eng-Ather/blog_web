import {
    //for authentication
    getAuth, 
    auth,
    createUserWithEmailAndPassword,

    //for file storege
    getStorage,        
    ref ,    
    storage,         
    uploadBytes,     
    getDownloadURL,

    // for firestorage
    db,
    getFirestore,     
    collection,     
    doc,            
    addDoc,    
    setDoc,
    getDocs,   
    deleteDoc,

} 
from "../../main.js"

// const auth = getAuth();
// console.log(auth);
// const storage = getStorage(app);
// console.log(storage);


const signup_fname = document.getElementById("signup_fname")
const signup_lname = document.getElementById("signup_lname")
const signup_image = document.getElementById("signup_image")
const signup_email = document.getElementById("signup_email")
const signup_password = document.getElementById("signup_password")
const signup_btn = document.getElementById("signup_btn")

// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// signup new user

signup_btn.addEventListener('click', function(){
    console.log('testing');
    if (!signup_email.value || !signup_password.value || !signup_fname.value || !signup_lname.value || !signup_image.files[0]) {
        return alert("Please fill all fields.");
    } 
    else {

        let userInfo_Object = {
            current_user_name : `${signup_fname.value} ${signup_lname.value}`,
            current_user_email : signup_email.value,
            current_user_pasword : signup_password.value
        }

     createUserWithEmailAndPassword(auth, signup_email.value, signup_password.value)
        .then((userCredential) => {
         // Signed up 
         const user = userCredential.user;
         console.log(user);
        //  window.location.href="../../my_profile/index.html" //move to user profile page

        //  __________________________________________________________

            // Upload image to Firebase Storage
            const userImageRef = ref(storage, `images/${signup_image.files[0].name}`);
            uploadBytes(userImageRef, signup_image.files[0])
            .then((snapshot) => {
                console.log('Uploaded a file to storage!');

                // Get download URL for the uploaded image
                getDownloadURL(userImageRef)
                .then((url) => {
                    userInfo_Object.userImage = url;
                    console.log(url);
                    console.log('added url to user info object');

                    // Create user profile document in Firestore
                    const userDbRef = doc(db, "usersProfile", userCredential.user.uid);
                    setDoc(userDbRef, userInfo_Object)
                    .then(() => {
                        console.log("User info Object Updated into DB with name userProfile");
                        // Redirect to signin page after successful signup
                        // location.href = "../signin/index.html";
         window.location.href="../../my_profile/index.html" //move to user profile page

                    })
                    .catch((error) => {
                        console.error('Error in creating user profile document in Firestore =>', error);
                        alert('Failed to create user profile.');
                    });
                })
                .catch((error) => {
                    console.error('Error in downloading URL:', error);
                    alert('Error in downloading URL');
                });
            })
            .catch((error) => {
                console.error('Error in uploading file to fire storage:', error);
                alert('Error in uploading file to fire storage:');
            });
            // ______________________________________________________________

        })

       .catch((error) => { //current user cathch for error
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
        });

    }//end of else

})//end of signup event


// ------------------------------------------------------------------

// import {getAuth,
//         auth,
//         createUserWithEmailAndPassword,
//         getStorage,
//         storage,
//         ref,
//         uploadBytes
//     } 
//     from "../../main.js"
    

// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../../main.js"; // Make sure 'db' is exported from main.js

// const auth = getAuth(); // Initialize auth
// const storage = getStorage(); // Initialize storage

// const signup_fname = document.getElementById("signup_fname");
// const signup_lname = document.getElementById("signup_lname");
// const signup_image = document.getElementById("signup_image");
// const signup_email = document.getElementById("signup_email");
// const signup_password = document.getElementById("signup_password");
// const signup_btn = document.getElementById("signup_btn");

// signup_btn.addEventListener('click', function() {
//     console.log('testing');
    
//     if (!signup_email.value || !signup_password.value || !signup_fname.value || !signup_lname.value || !signup_image.files[0]) {
//         return alert("Please fill all fields.");
//     } else {
//         const userInfo_Object = {
//             current_user_name: `${signup_fname.value} ${signup_lname.value}`,
//             current_user_email: signup_email.value,
//             current_user_password: signup_password.value // Fixed typo: 'current_user_pasword' to 'current_user_password'
//         };

//         createUserWithEmailAndPassword(auth, signup_email.value, signup_password.value)
//             .then((userCredential) => {
//                 const user = userCredential.user;
//                 console.log(user);

//                 // Upload image to Firebase Storage
//                 const userImageRef = ref(storage, `images/${signup_image.files[0].name}`);
//                 uploadBytes(userImageRef, signup_image.files[0])
//                     .then((snapshot) => {
//                         console.log('Uploaded a file to storage!');

//                         // Get download URL for the uploaded image
//                         getDownloadURL(userImageRef)
//                             .then((url) => {
//                                 userInfo_Object.userImage = url;
//                                 console.log('File URL:', url);

//                                 // Create user profile document in Firestore
//                                 const userDbRef = doc(db, "usersProfile", userCredential.user.uid);
//                                 setDoc(userDbRef, userInfo_Object)
//                                     .then(() => {
//                                         console.log("User info Object Updated into DB with name userProfile");
//                                         window.location.href = "../../my_profile/index.html"; // Move to user profile page
//                                     })
//                                     .catch((error) => {
//                                         console.error('Error in creating user profile document in Firestore:', error);
//                                         alert('Failed to create user profile.');
//                                     });
//                             })
//                             .catch((error) => {
//                                 console.error('Error in downloading URL:', error);
//                                 alert('Error in downloading URL');
//                             });
//                     })
//                     .catch((error) => {
//                         console.error('Error in uploading file to Firestore:', error);
//                         alert('Error in uploading file to Firestore');
//                     });
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 alert(`Sign-up failed: ${errorMessage}`);
//             });
//     }
// });


