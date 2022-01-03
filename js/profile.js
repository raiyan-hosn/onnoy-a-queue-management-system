const profileContainer = document.getElementById("profile-container");

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        let email = user.email;
        let name = user.displayName;
        let photoUrl = user.photoURL;
        profileContainer.innerHTML = "";
        profileContainer.innerHTML = `
		<div class="col-sm-6">
			<div class="text-sm-right text-xs-center mx-3">
				<img src="${photoUrl}" class="rounded img-thumbnail" alt="...">
			</div>
		</div>
		<div class="col-sm-6">
			<div class="text-sm-start text-xs-center mx-3">
				<p>Name: <strong>${name}</strong></p>
				<p>Email: <strong>${email}</strong></p>
				<p class="mt-4 text-secondary">Your profile is synchronize with your google account</p>
			</div>
		</div>

		
		`;
    } else {
        profileContainer.innerHTML = "";
        profileContainer.innerHTML = `
			<div class="col-12 display-3 text-center text-secondary">
				<div><i class="fas fa-exclamation-circle"></i></div>
				<div><p>Please Login First</p></div>
			</div>
		`;
    }
});
