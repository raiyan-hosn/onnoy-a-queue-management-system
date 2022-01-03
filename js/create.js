const createContqainer = document.getElementById("create-container");
let invitedEmails = [];

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        const createMenu = document.getElementById("create-menu");
        createMenu.addEventListener("click", () => {
            createWindow();
        });

        document.getElementById("create-btn").addEventListener("click", () => {
            indexOfMenu = 2;
            displaySection(indexOfMenu);
            createWindow();
        });
    } else {
        createContqainer.innerHTML = "";
        createContqainer.innerHTML = `
        <div class="row">
            <div class="col-12 display-3 text-center text-secondary">
                <div><i class="fas fa-exclamation-circle"></i></div>
                <div><p>Please Login First</p></div>
            </div>
        </div>
        `;

        document.getElementById("create-btn").addEventListener("click", () => {
            indexOfMenu = 2;
            displaySection(indexOfMenu);
            createContqainer.innerHTML = "";
            createContqainer.innerHTML = `
            <div class="row">
                <div class="col-12 display-3 text-center text-secondary">
                    <div><i class="fas fa-exclamation-circle"></i></div>
                    <div><p>Please Login First</p></div>
                </div>
            </div>
            `;
        });
    }
});

const queueIdShow = (qid) => {
    createContqainer.innerHTML = ``;
    createContqainer.innerHTML = `
    <div class="text-center">
        <h3>Your Queue ID is: ${qid}</h3>
        <div class="mt-3">
            <button id="copyQid" class="button">Copy Queue Id</button>
            <button id="loadQueueWindow" class="button">Create Another Queue</button>
        </div>
    </div>
    `;

    const copyQid = document.getElementById("copyQid");
    copyQid.addEventListener("click", () => {
        navigator.clipboard.writeText(qid);
    });
    const loadQueueWindow = document.getElementById("loadQueueWindow");
    loadQueueWindow.addEventListener("click", () => {
        createWindow();
    });
};

const createWindow = () => {
    createContqainer.innerHTML = "";
    createContqainer.innerHTML = `
<form id="createQueueForm" class="col-md-6 mx-auto  text-center">
<div class="mb-3">
    <input id="queueTitle" type="text" class="form-control" placeholder="Enter A Title" required>
</div>
<div class="mb-3">
    <input id="create-date" type="date"  class="form-control" required>
</div>
<!-- <select id="queue-desk-type" class="form-select" aria-label="Default select example">
    <option selected value="desk-record">Desk Record</option>
    <option value="fixed-counter">Fixed Counter</option>
</select> -->

<button id="handleCreateQueue" type="button" class="button mt-3">Submit</button>

</form>
<div class="col-md-6 mx-auto  text-center">
<div class="input-group mt-3">
<input id="invitedEmailInput" type="Email" class="form-control" placeholder="Inviete Someone" aria-label="Recipient's username with two button addons">
<select id="invitedEmailType" class="form-select" aria-label="Default select example">
    <option value="Desk">Desk</option>
    <option value="Counter">Counter</option>
</select>
<button id="invitedEmailButton" class="btn" type="button"><i class="fas fa-plus"></i></button>
</div>
<div class="invited-email text-center">
<div id="invited-eamil-area"></div>
</div>
</div>
`;

    // variable and selectors

    // invited email adder button all workds
    const invitedEmailInput = document.getElementById("invitedEmailInput");
    const invitedEmailButton = document.getElementById("invitedEmailButton");
    const invitedEmailType = document.getElementById("invitedEmailType");
    const createList = document.createElement("ul");
    const inviteEmailArea = document.querySelector("#invited-eamil-area");

    invitedEmailButton.classList.add("button");

    invitedEmailButton.addEventListener("click", function () {
        if (invitedEmailInput.value !== "") {
            invitedEmails.push([
                invitedEmailInput.value,
                invitedEmailType.value,
            ]);
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
                listItem.classList.add("p-2");
                listItem.classList.add("bg-light");
                listItem.classList.add("rounded");

                listItem.innerHTML = `
            <div class="row col-9 m-0 invitedEmail-item-info d-flex justify-content-center align-items-center">
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
            <div class="trash invitedEmail-item-trash rounded-circle col-3">
                <div><i class="trash fas fa-times"></i></div>
            </div>
        `;

                listItem.addEventListener("click", function (event) {
                    if (event.target.classList[0] === "trash") {
                        const targatedLi = event.target.parentElement;
                        invitedEmails.splice(targatedLi.id, 1);
                        targatedLi.remove();
                        console.log(invitedEmails);
                    }
                });

                createList.appendChild(listItem);
            }
        });
    };
    let createDate = document.getElementById("create-date");
    createDate.value = `${d.getDate()}-${monthName}-${d.getFullYear()}`;

    document
        .getElementById("handleCreateQueue")
        .addEventListener("click", () => {
            handleCreateQueue();
        });

    const handleCreateQueue = () => {
        let queueTitle = document.getElementById("queueTitle").value;
        let queueDate = document.getElementById("create-date").value;
        // const queueDeskType = document.getElementById("queue-desk-type").value;
        const currentTime = new Date();

        // newQueue is the your queue info, do whatever you want to do
        const newQueue = {
            queueTitle,
            queueDate,
            queueDeskType: "desk-record",
            currentTime,
            invitedEmails,
        };

        createQueue(newQueue);
        //Clear all field
        queueTitle = "";
        queueDate = "";
        queueDeskType = "desk-record";
        invitedEmails.splice(0, invitedEmails.length);
    };
};
