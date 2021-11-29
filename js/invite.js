// const obj = {
// 	title: "bank queue",
// 	id: "uerw-kerj-ekr",
// 	time: "10 am, 13 June 2021",
// 	owner: "abc@gmail.com",
// 	access: "desk",
// };

// const arr = [obj, obj, obj, obj, obj, obj];
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
