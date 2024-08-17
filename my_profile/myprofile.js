import{
      getAuth,
      auth,
      signOut,
      getStorage,
      doc,            
      db,
      getDocs,
      updateDoc,
     collection,
     ref,
     updateProfile,
     getFirestore,
     storage,         
     uploadBytes,     
     getDownloadURL,
  
  }
  from '../main.js'
  
//from current user profile box
const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const profilePic = document.getElementById('profilePic');
const logout_btn = document.getElementById("logout_btn");
const update_btn = document.getElementById("update_btn");

//from update profile box
const update_profile_box = document.getElementById('update_profile_box')
const profilr_edit_button = document.getElementById('profilr_edit_button')
const updated_email = document.getElementById('updated_email')
const updated_pasword = document.getElementById('updated_pasword')
const updated_name = document.getElementById('updated_name')
const updated_image = document.getElementById('updated_image')


displayProfile();

// ____________ (Get user profile function) _____________
async function displayProfile() {
  try {
    const querySnapshot = await getDocs(collection(db, "usersProfile"));
    querySnapshot.forEach((doc) => {
      // Checking current user profile info
      if (auth.currentUser.email === doc.data().current_user_email) {
        profileName.innerText = doc.data().current_user_name;
        profileEmail.innerText = doc.data().current_user_email;  
        profilePic.innerHTML = `<img src=${doc.data().userImage} alt="profile pic"></img>`;
      }
    });
  } catch (e) {
    console.error("Error retrieving documents: ", e);
  }
}

// Logout function ____________________________________________________
logout_btn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Sign-out successful.");
      location.href = "../index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}); // End of signout event


// ___________________ (Edit profile) ____________________

update_btn.addEventListener('click', async () => {
  update_profile_box.style.display = 'block';  
});

// To update edit info
profilr_edit_button.addEventListener('click', async () => {

  // Upload image to Firebase Storage
  const userImageRef = ref(storage, `images/${ updated_image.files[0].name}`);

  try {
    // Upload the image file
    await uploadBytes(userImageRef,  updated_image.files[0]);
    console.log('Uploaded a file to storage!');

    // generating url
    const imageUrl = await getDownloadURL(userImageRef);
    console.log('Image URL:', imageUrl);

    // Hide the profile box
    update_profile_box.style.display = 'none'; 

    // Check if user is signed in
    if (auth.currentUser) {
      // Create reference to the user's document
      const userDocRef = doc(db, 'usersProfile', auth.currentUser.uid);

      // Update user info object
      await updateDoc(userDocRef, {
        current_user_name: updated_name.value,
        userImage: imageUrl
      });

      console.log('Profile updated successfully!');
      displayProfile(); // Call function to display updated profile
    } else {
      console.log('No user is signed in.');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('Error updating profile');
  }
  
}); // End of update profile event
