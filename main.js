
import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";


// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";




import{
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
 }
from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";


import { 
  getStorage,        // to initallize storage
  ref ,             // to creat refrence of storage
  uploadBytes,     // to upload file
  getDownloadURL  // to download file
  } 
from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

import { 
  getFirestore,     //to initallize firestore
  collection,      //to create collection in firestore
  doc,            // to create doc inside collection
  addDoc,        //to add TODO (data)
  setDoc,
  getDocs,      //to get TODO (data)
  updateDoc,
  deleteDoc,   //to delete TODO (save data)
  query,
  where,   
} 
from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

import { getAnalytics }
from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDJld5o4DHtjaftElETiRguE_D59Jd1ynM",
  authDomain: "c2c-makrtplace.firebaseapp.com",
  projectId: "c2c-makrtplace",
  storageBucket: "c2c-makrtplace.appspot.com",
  messagingSenderId: "615772781453",
  appId: "1:615772781453:web:99fa4ff701d15cccb0dbc4",
  measurementId: "G-HZZ0DHPJ5E"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

//   expot function
export{
    // import for authentication
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    auth,
    updateProfile,

    // import for storage (store file/image)
    db,
    getStorage,        
    ref ,             
    uploadBytes,     
    getDownloadURL,
    storage,


    getFirestore,     
    collection,     
    doc,            
    addDoc,        
    setDoc,
    getDocs,
    updateDoc,     
    deleteDoc,   
    query,
    where, 
}