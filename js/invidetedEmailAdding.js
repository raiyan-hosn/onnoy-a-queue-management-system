// variable and selectors

invitedEmails = [];

// invited email adder button all workds
const invitedEmailInput = document.getElementById("invitedEmailInput");
const invitedEmailButton = document.getElementById("invitedEmailButton");
const invitedEmailType = document.getElementById("invitedEmailType");

invitedEmailButton.classList.add("button");

invitedEmailButton.addEventListener("click", function () {
  invitedEmails.push([invitedEmailInput.value, invitedEmailType.value]);

  invitedEmailInput.value = "";
  invitedEmailType.value = "Desk";
});

//invited email adder button works ends here...

// invited email list all works start from here...

const inviteEmailArea = document.querySelector("#invited-eamil-area");

// logical part
if (invitedEmails.length == 0) {
  const noOneInvited = document.createElement("div");
  noOneInvited.innerText = "Currently no one is invited to this queue";
  noOneInvited.classList.add("no-one-invited");
  inviteEmailArea.appendChild(noOneInvited);
} else {
  const createList = document.createElement("ul");

  for (let i = 0; i < invitedEmails.length; i++) {
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
    listItemDiv.classList.add("justify-content-center");
    listItemDiv.classList.add("align-items-center");
    listItemDiv.classList.add("invitedEmail-item-info");

    const listItemImageDiv = document.createElement("div");
    const listItemInfoDiv = document.createElement("div");

    const listItemImage = document.createElement("img");
    const listItemInfoEmail = document.createElement("h6");
    const listItemInfoType = document.createElement("h6");
    const listItemTrashIcon = document.createElement("i");

    // image link will give by rayhan
    // setting image for now
    listItemImage.src = `${i + 1}.jpg`;
    listItemImageDiv.appendChild(listItemImage);
    listItemImageDiv.classList.add("invitedEmail-item-info-img");
    listItemDiv.appendChild(listItemImageDiv);

    // Info collecting
    listItemInfoEmail.innerText = invitedEmails[i][0];
    listItemInfoType.innerText = invitedEmails[i][1];
    listItemInfoDiv.appendChild(listItemInfoEmail);
    listItemInfoDiv.appendChild(listItemInfoType);
    listItemDiv.appendChild(listItemInfoDiv);

    // trash button adding ...
    listItemTrashIcon.classList.add("fas");
    listItemTrashIcon.classList.add("fa-times");
    listItemTrashDiv.classList.add("invitedEmail-item-trash");
    listItemTrashDiv.classList.add("rounded-circle");
    listItemTrashDiv.appendChild(listItemTrashIcon);

    listItem.appendChild(listItemDiv);
    listItem.appendChild(listItemTrashDiv);
    createList.appendChild(listItem);
  }

  inviteEmailArea.appendChild(createList);
}

// fuctions and event handler

/* previous works

// Selectors

const invitedEmailInput = document.querySelector("#invitedEmailInput");
const invitedEmailButton = document.querySelector("#invitedEmailButton");
invitedEmailButton.type = "button";
const invitedEmailList = document.querySelector(".invited-email-list");

// EventListener

invitedEmailButton.addEventListener("click", addInvitedEmail);
invitedEmailList.addEventListener("click", deleteCheck);

// Functions

function addInvitedEmail(event) {
  // prevent form from submitting
  event.preventDefault();
  // Invited Email DIV
  const invitedEmailDiv = document.createElement("div");
  invitedEmailDiv.classList.add("d-flex");
  invitedEmailDiv.classList.add("justify-content-between");
  invitedEmailDiv.classList.add("align-items-center");
  invitedEmailDiv.classList.add("mt-3");

  // Get selected value
  const selectedInvitedEmailType = document.getElementById("invitedEmailType");

  //Invited Email LI

  const newInvitedEmail = document.createElement("li");
  newInvitedEmail.innerText = `${invitedEmailInput.value} as ${invitedEmailType.value}`;
  // newTodo.classList.add("todo-item");
  invitedEmailDiv.appendChild(newInvitedEmail);

  // Trash  Button

  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  trashButton.classList.add("rounded-pill");
  invitedEmailDiv.appendChild(trashButton);

  //Finally Append to list
  if (invitedEmailInput.value != "")
    invitedEmailList.appendChild(invitedEmailDiv);

  // Clear todo input value

  invitedEmailInput.value = "";
}
// TODO: Delete Button Is not working
function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.addEventListener("click", function () {
      todo.remove();
    });
  }
}

*/
