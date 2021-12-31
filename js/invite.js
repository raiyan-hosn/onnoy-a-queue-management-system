const inviteContainer = document.getElementById("invite-container");

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        let email = user.email;
        email = filterPath(email);
        usersRef.child(email + "/inviteList").on("value", function (snapshot) {
            if (snapshot.val() == null) {
                //not found
                inviteContainer.innerHTML = "";
                inviteContainer.innerHTML = `
					<div class="col-12">No Invitation</div>
				`;
            } else {
                let qidList = Object.keys(snapshot.val());
                let inviteQueue = "";
                inviteContainer.innerHTML = "";
                for (let i = 0; i < Object.keys(snapshot.val()).length; i++) {
                    let qid = qidList[i];
                    let access = snapshot.val()[qid];
                    queuesRef.child(qid).on("value", function (snapshot) {
                        if (snapshot.val() == null) {
                            //queue not found
                        } else {
                            let title = snapshot.val().tittle;
                            let time = snapshot.val().time;
                            let owner = snapshot.val().owner;
                            owner = antiFilterPath(owner);
                            ///inter your html here
                            inviteQueue =
                                inviteQueue +
                                `<div class="col-md-4 col-sm-6">
												<div class='prev-item'>
													<h3>Title: ${title}</h3>
													<h4>ID: <span class="text-lowercase">${qid}</span><h4>
													<h4>time: ${time}<h4>
													<h4>access: <span class="invitation-desk">${access}<span><h4>
													<h4 class="text-lowercase">owner: ${owner}<h4>
													<div class="accept-decline-btn">
														<button currentUserEmail="${email}" deskType="${access}" class="${qid} accpet-btn" name="invitation-accept" class="accpet-btn">Accept</button>
														<button currentUserEmail="${email}" class="${qid} decline-btn" name="invitation-decline" class="decline-btn">Decline</button>
													</div>
												</div>
									</div>`;
                        }
                        inviteContainer.innerHTML = inviteQueue;
                        inviteQueue = "";
                    });
                }
            }
        });
    } else {
        // No user is signed in.
    }
});

inviteContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        if (e.target.name === "invitation-accept") {
            acceptInvitation(
                e.target.getAttribute("currentUserEmail"),
                e.target.classList[0],
                e.target.getAttribute("deskType")
            );
        } else if (e.target.name === "invitation-decline") {
            declineInvitation(
                e.target.getAttribute("currentUserEmail"),
                e.target.classList[0]
            );
        }
    }
});
