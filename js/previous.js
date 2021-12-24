

const prevContainer = document.getElementById("prev-container");



firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
			// User is signed in.
			let email=user.email;
			email=filterPath(email);
			usersRef.child(email+"/previousList").on("value",function(snapshot){
				if(snapshot.val()==null){
					//not found
					
				}else{
					let qidList=Object.keys(snapshot.val());
					let prevQueue = "";
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
								
								prevQueue =
										
										`<div class="col-md-4 col-sm-6">
											<div class='prev-item'>
												<h3>Title: ${title}</h3>
												<h4 class='prev-item-id'>ID: ${qid}<h4>
												<h4>time: ${time}<h4>
												<h4>access: ${access}<h4>
												<div class="prev-details">
													<button class="prev-details-btn">see details</button>
												</div>
											</div>
								</div>` + prevQueue;
							}
							prevContainer.innerHTML = prevQueue;
						});
					}
				}
			});
	} else {
		// No user is signed in.
	}
});


