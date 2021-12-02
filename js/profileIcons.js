// Login Function
const profileIcon = document.querySelector(".profile-icon");
const profileIconButton = document.createElement("button");
profileIconButton.classList.add("signInProfileNav");

profileIconButton.addEventListener("click", function () {
  signInWithGoogle();
});

// SignIn Button Handler

function creatingProfileIcon() {
  let email = filterPath(firebase.auth().currentUser.email);
  usersRef.child(email).on("value", function (snapshot) {
    if (snapshot.val() == null) {
      console.log("No photo found for email: " + antiFilterPath(email));
    } else {
      let profileImage = document.createElement("img");
      profileIconButton.classList.add("user-img-nav");
      profileImage.src = snapshot.val().photoURL;
      profileIconButton.appendChild(profileImage);
      profileIcon.appendChild(profileIconButton);
    }
  });
}
function creatingSignInBtn() {
  profileIconButton.innerText = "Sign In";
  profileIconButton.classList.add("button");
  profileIcon.appendChild(profileIconButton);
}

// Profile Nav Generator

profileIconButton.addEventListener("click", function () {
  generateProfileNavs();
});

function generateProfileNavs() {
  // profile menu
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      let email = filterPath(user.email);
      usersRef.child(email).on("value", function (snapshot) {
        if (snapshot.val() == null) {
          console.log("No photo found for email: " + antiFilterPath(email));
        } else {
          let userName = getUserName();
          const largeImg = document.createElement("img");
          largeImg.src = snapshot.val().photoURL;
          // console.log(largeImg);
          const profileNavs = document.createElement("div");
          profileNavs.id = "profile-nav";
          profileNavs.classList.add("profile-nav-options");
          profileNavs.innerHTML = `<ul class="p-0 d-flex flex-column align-items-center">
          <li><img src="${largeImg.src}"></li>
          <li><h5>${userName}</h5></li>
          <li><button class="button" onclick="signOut()">Sign Out</button></li>
        </ul>`;
          profileIcon.appendChild(profileNavs);
        }
      });

    } else {
      // No user is signed in.
    }
  });

}
