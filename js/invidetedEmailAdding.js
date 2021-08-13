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

function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.addEventListener("click",deleteTodo(todo));
  }
}
function deleteTodo(todo)
{
  console.log(todo);
  todo.remove();
}
