// variable and selectors

const invitedEmails = [];

// invited email adder button all workds
const invitedEmailInput = document.getElementById("invitedEmailInput");
const invitedEmailButton = document.getElementById("invitedEmailButton");
const invitedEmailType = document.getElementById("invitedEmailType");
const createList = document.createElement("ul");
const inviteEmailArea = document.querySelector("#invited-eamil-area");

invitedEmailButton.classList.add("button");

invitedEmailButton.addEventListener("click", function () {
  if (invitedEmailInput.value !== "") {
    invitedEmails.push([invitedEmailInput.value, invitedEmailType.value]);
  }

  invitedEmailInput.value = "";
  invitedEmailType.value = "Desk";
  createList.innerHTML = "";
  invitedEmails.map((person, index) => {
    newAddPerson(person[0], person[1], index);
  });
  inviteEmailArea.classList.add("mt-3");
  inviteEmailArea.appendChild(createList);
});

// new addPerson fuction

const newAddPerson = (email, type, index) => {
  usersRef.child(filterPath(email)).once("value", function (snapshot) {
    if (snapshot.val() == null) {
    } else {
      let photoURL = snapshot.val().photoURL;
      let name = snapshot.val().name;
      const listItem = document.createElement("li");
      listItem.id = index;
      listItem.classList.add("row");
      listItem.classList.add("justify-content-center");
      listItem.classList.add("align-items-center");
      listItem.classList.add("mx-auto");
      listItem.classList.add("my-2");

      listItem.innerHTML = `
                <div class="row col m-0 invitedEmail-item-info d-flex justify-content-center align-items-center">
                  <div class="invitedEmail-item-info-img col-3">
                    <img src="${photoURL}"/>
                  </div>
                  <div class="col-6">
                    <h5>${name}</h5>
                    <h6>${email}</h6>
                  </div>
                  <div class="col-3">
                    <h5>${type}</h5>
                  </div>
                </div>
            
                // trash button 
            
                <div class="trash invitedEmail-item-trash rounded-circle col-3">
                  <i class="trash fas fa-times"></i>
                </div>
              `;

      listItem.addEventListener("click", function (event) {
        if (event.target.classList[0] === "trash") {
          const targatedLi = event.target.parentElement;
          invitedEmails.splice(targatedLi.id, 1);
          console.log(invitedEmails);
          targatedLi.remove();
        }
      });

      createList.appendChild(listItem);
    }
  });
};
