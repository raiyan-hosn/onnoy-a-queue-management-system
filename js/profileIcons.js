
// Login Function
const profileIcon = document.querySelector(".profile-icon");
const profileIconButton = document.createElement("button");
profileIconButton.id = "signInFromHome";

profileIconButton.addEventListener("click", function () {
  signInWithGoogle();
});
function creatingProfileIcon(){
  let email = filterPath(firebase.auth().currentUser.email);
  usersRef
    .child(email)
    .on("value", function (snapshot) {

      if (snapshot.val() == null) {
        console.log("No photo found for email: " + antiFilterPath(email));
      } else {
        let imageSrc = snapshot.val().photoURL;
        let profileImage = document.createElement("img");
        profileImage.src = imageSrc;
        profileIconButton.appendChild(profileImage);
        profileIconButton.style.border = "none";
        profileIconButton.style.borderRadius = "50%";
        profileIcon.style.height = "60px";
        profileIcon.style.width = "60px";
        profileIcon.style.position = "relative";
        profileIcon.appendChild(profileIconButton);
      }
    });
}
function creatingSignInBtn(){
  profileIconButton.innerText = "Sign In";
  profileIconButton.classList.add("button");
  profileIcon.appendChild(profileIconButton);
}


function generateProfileNavs() {
  // profile menu

  const largeImg = document.createElement("img");
  largeImg.src = getUserPhotoURL(firebase.auth().currentUser.email);
  console.log(largeImg);
  const profileNavs = document.createElement("div");
  profileNavs.classList.add("profile-nav-options");
  profileNavs.innerHTML = `<ul class="p-0 d-flex flex-column align-items-center">
      <li><img src="${largeImg.src}"></li>
      <li><h5>Name of Owner</h5></li>
      <li><button class="button">Sign Out</button></li>
    </ul>`;
  profileIcon.appendChild(profileNavs);
}


