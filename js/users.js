var usersRef = firebase.database().ref("users");
function signInWithGoogle() {
	if (!firebase.auth().currentUser) {
		var provider = new firebase.auth.GoogleAuthProvider();
		//provider.addScope('https://www.googleapis.com/auth/plus.login');
		firebase.auth().signInWithRedirect(provider);
	} else {
		console.log("already signed in");
		console.log(firebase.auth().currentUser.photoURL);
	}
}
function isSignedIn() {
	if (firebase.auth().currentUser) {
		//console.log(firebase.auth().currentUser.email);
		return true;
	}
	return false;
}
function signOut() {
	firebase.auth().signOut();
	location.reload();
}

function createUser() {
	if (!isSignedIn()) {
		return;
	}
	var email = firebase.auth().currentUser.email;
	email = filterPath(email);
	var displayName = firebase.auth().currentUser.displayName;

	usersRef.child(email)
		.set({
			name: displayName,
			photoURL: firebase.auth().currentUser.photoURL,
		});
}
function updateUser() {
	if (!isSignedIn()) {
		return;
	}
	var email = firebase.auth().currentUser.email;
	email = filterPath(email);
	var displayName = firebase.auth().currentUser.displayName;
	usersRef
		.child(email)
		.update({
			name: displayName,
			photoURL: firebase.auth().currentUser.photoURL,
		});
}
function filterPath(str) {
	return str.replaceAll(".", "_");
}
function antiFilterPath(str) {
	return str.replaceAll("_", ".");
}


function getUserEmail() {
	var email = firebase.auth().currentUser.email;
	return email;
}
function getUserName() {
	return firebase.auth().currentUser.displayName;
}
function getUserPhotoURL(email) {
	email = filterPath(email);
	usersRef
		.child(email)
		.on("value", function (snapshot) {

			if (snapshot.val() == null) {
				console.log("No photo found for email: " + email);
				return null;
			} else {
				photoURL = snapshot.val().photoURL;
				console.log(photoURL);
				return photoURL;
			}
		});

}
function initApp() {
	// Result from Redirect auth flow.
	firebase
		.auth()
		.getRedirectResult()
		.then(function (result) {
			if (result.credential) {
				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = result.credential.accessToken;
				//document.getElementById('quickstart-oauthtoken').textContent = token;
			} else {
				//document.getElementById('quickstart-oauthtoken').textContent = 'null';
			}
			// The signed-in user info.
			var user = result.user;
		})
		.catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			if (errorCode === "auth/account-exists-with-different-credential") {
				alert(
					"You have already signed up with a different auth provider for that email."
				);
				// If you are using multiple auth providers on your app you should handle linking
				// the user's accounts here.
			} else {
				console.error(error);
			}
		});
	// Listening for auth state changes.
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			creatingProfileIcon();
			let email =filterPath(firebase.auth().currentUser.email);
			
			usersRef
				.once("value", function (snapshot) {
					if (snapshot.hasChild(email)) {
						updateUser(firebase);
					} else {
						createUser(firebase);
					}
					
				});
				
		} else {
			//user logedout
			creatingSignInBtn();
		}
	});
}
window.onload = function () {
	initApp();
};
