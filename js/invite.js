
let inviteQueue = "";
for (let i = 0; i < arr.length; i++) {
	inviteQueue =
		inviteQueue +
		`<div class="col-md-4 col-sm-6">
			<div class='prev-item'>
				<h3>Title: ${arr[i].title}</h3>
				<h4 class='prev-item-id'>ID: ${arr[i].id}<h4>
				<h4>time: ${arr[i].time}<h4>
				<h4>access: ${arr[i].access}<h4>
				<h4>owner: rayhan<h4>
				<div class="accept-decline-btn">
					<button class="accpet-btn">Accept</button>
                    <button class="decline-btn">Decline</button>
				</div>
			</div>
  </div>`;
}

const inviteContainer = document.getElementById("invite-container");
inviteContainer.innerHTML = inviteQueue;


firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		// User is signed in.
		let email=user.email;
		email=filterPath(email);
		usersRef.child(email+"/inviteList").on("value",function(snapshot){
			if(snapshot.val()==null){
				//not found
				
			}else{
				let qidList=Object.keys(snapshot.val());
				
				for(let i=0;i<Object.keys(snapshot.val()).length;i++){
					let qid=qidList[i];
					let access=snapshot.val()[qid];
					queuesRef.child(qid).on("value",function(snapshot){
						if(snapshot.val()==null){
							//queue not found
						}
						else{
							let title= snapshot.val().tittle;
							let time=snapshot.val().time;
							let owner=snapshot.val().owner;
							
							///inter your html here

						}
					});
				}
			}
		});
	} else {
		// No user is signed in.
	}
});

