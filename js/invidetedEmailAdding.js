// variable and selectors

invitedEmails = [];

// invited email adder button all workds
const invitedEmailInput = document.getElementById("invitedEmailInput");
const invitedEmailButton = document.getElementById("invitedEmailButton");
const invitedEmailType = document.getElementById("invitedEmailType");

invitedEmailButton.classList.add("button");

invitedEmailButton.addEventListener("click", function () {
  let email= invitedEmailInput.value;
  let type= invitedEmailType.value;

  usersRef
		.child(filterPath(email))
		.once("value", function (snapshot) {

			if (snapshot.val() == null) {
				console.log("No user found for this email");
			
			} else {
        invitedEmails.push([invitedEmailInput.value, invitedEmailType.value]);
				let photoURL = snapshot.val().photoURL;
        let name= snapshot.val().name;
				

        const createList = document.createElement("ul");
        const listItem = document.createElement("li");
        const listItemDiv = document.createElement("div");
        const listItemTrashDiv = document.createElement("div");
        // adding bootstrap class on listItemDiv
        listItem.classList.add("d-flex");
        listItem.classList.add("justify-content-center");
        // listItem.classList.add("align-items-center");
        listItem.classList.add("mt-4");
        // adding bootstrap class and custom class on listItemDiv
        listItemDiv.classList.add("d-flex");
        listItemDiv.classList.add("justify-content-between");
        listItemDiv.classList.add("align-items-center");
        listItemDiv.classList.add("invitedEmail-item-info");
      
        const listItemImageDiv = document.createElement("div");
        const listItemInfoDiv = document.createElement("div");
        const listItemInfoTypeDiv = document.createElement("div");
      
        const listItemImage = document.createElement("img");
        const listItemInfoEmailName = document.createElement("h5");
        const listItemInfoEmail = document.createElement("h6");
        const listItemInfoType = document.createElement("h5");
        const listItemTrashIcon = document.createElement("i");
      
        // image link will give by rayhan
        // setting image for now
        listItemImage.src = photoURL;
        listItemImageDiv.appendChild(listItemImage);
        listItemImageDiv.classList.add("invitedEmail-item-info-img");
        listItemDiv.appendChild(listItemImageDiv);
      
        // Info collecting
        listItemInfoEmailName.innerText = name;
        listItemInfoEmail.innerText = email;
        listItemInfoType.innerText = type;
        listItemInfoDiv.appendChild(listItemInfoEmailName);
        listItemInfoDiv.appendChild(listItemInfoEmail);
        listItemInfoTypeDiv.appendChild(listItemInfoType);
        listItemDiv.appendChild(listItemInfoDiv);
        listItemDiv.appendChild(listItemInfoTypeDiv);
      
        // trash button adding ...
        listItemTrashIcon.classList.add("trash");
        listItemTrashIcon.classList.add("fas");
        listItemTrashIcon.classList.add("fa-times");
        listItemTrashDiv.classList.add("trash");
        listItemTrashDiv.classList.add("invitedEmail-item-trash");
        listItemTrashDiv.classList.add("rounded-circle");
        listItemTrashDiv.appendChild(listItemTrashIcon);
        listItem.addEventListener("click", function (event) {
          if (event.target.classList[0] === "trash") {
            const targatedLi = event.target.parentElement;
            targatedLi.remove();
          }
        });
      
        // trash button fuction
      
        // appending all in the ul
        listItem.appendChild(listItemDiv);
        listItem.appendChild(listItemTrashDiv);
        createList.appendChild(listItem);
        inviteEmailArea.appendChild(createList);
        invitedEmailInput.value = "";
        invitedEmailType.value = "Desk";
			}
		});

 
});

//invited email adder button works ends here...

// invited email list all works start from here...

const inviteEmailArea = document.querySelector("#invited-eamil-area");

if (invitedEmails.length == 0) {
  const noOneInvited = document.createElement("div");
  noOneInvited.innerText = "Currently no one is invited to this queue";
  noOneInvited.classList.add("no-one-invited");
  inviteEmailArea.appendChild(noOneInvited);
} else {
  
}

