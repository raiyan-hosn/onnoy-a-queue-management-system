let loginStatusForProfile = false;

const profile = document.querySelector(".profile-area");

if (loginStatusForProfile) {
	const profileRow = document.createElement("div");
	profileRow.classList.add("row");
	const profileLeft = document.createElement("div");
	const profileRight = document.createElement("right");
	profileLeft.classList.add("profile-left");
	profileLeft.classList.add("col-md-6");
	profileRight.classList.add("profile-right");
	profileRight.classList.add("col-md-6");
} else {
	const errorIcon = document.createElement("i");
	errorIcon.classList.add("fas");
	errorIcon.classList.add("fa-exclamation-circle");
	errorIcon.classList.add("text-center");
	errorIcon.style.marginTop = "120px";
	errorIcon.style.fontSize = "120px";
	errorIcon.style.color = "#E3E3E3";
	errorIcon.style.display = "block";
	const loginMessage = document.createElement("h2");
	loginMessage.classList.add("text-center");
	loginMessage.innerText = "Please Log In First";
	loginMessage.style.fontSize = "80px";
	loginMessage.style.color = "#E3E3E3";
	profile.appendChild(errorIcon);
	profile.appendChild(loginMessage);
}

// jodi signed in hoy tahole eita hobe........................

const profileContainer = document.getElementById("profile-container");
	profileContainer.innerHTML = `
		<div class="col-sm-6 mx-auto text-center">
			<img height="150px" width="150px" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" class="rounded" alt="user profile image">
			<h5 class="my-3">Name of user</h5>
			<h5 class="my-3">Email of user</h5>
			
		</div>
		<p>If you want to change your profile name and picture, at first change it to your google accout.</p>
	`;