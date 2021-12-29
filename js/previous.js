const prevContainer = document.getElementById("prev-container");

document.getElementById("prev-menu").addEventListener("click", () => {
    allPreviousLoader();
    prevContainer.classList.add("row");
    prevContainer.classList.remove("d-block");
});

const allPreviousLoader = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            let email = user.email;
            email = filterPath(email);
            usersRef
                .child(email + "/previousList")
                .on("value", function (snapshot) {
                    if (snapshot.val() == null) {
                        //not found
                    } else {
                        let qidList = Object.keys(snapshot.val());
                        let prevQueue = "";
                        for (
                            let i = 0;
                            i < Object.keys(snapshot.val()).length;
                            i++
                        ) {
                            let qid = qidList[i];
                            let access = snapshot.val()[qid];
                            queuesRef
                                .child(qid)
                                .on("value", function (snapshot) {
                                    if (snapshot.val() == null) {
                                        //queue not found
                                    } else {
                                        let title = snapshot.val().tittle;
                                        let time = snapshot.val().time;
                                        let owner = snapshot.val().owner;

                                        prevQueue =
                                            `<div class="col-md-4 col-sm-6">
                                                <div class='prev-item'>
                                                    <h3>Title: ${title}</h3>
                                                    <h4 class='prev-item-id'>ID: ${qid}<h4>
                                                    <h4>time: ${time}<h4>
                                                    <h4>access: ${access}<h4>
                                                    <div class="prev-details">
                                                        <button name="seeQueueDetails" id="${qid}" class="prev-details-btn">see details</button>
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
};

const myfunction = (params, calledFrom) => {
    prevContainer.innerHTML = "";
    prevContainer.classList.add("d-block");
    prevContainer.classList.remove("row");
    const {
        qid,
        email,
        owner,
        title,
        time,
        inviteList,
        counterList,
        deskList,
    } = params;

    prevContainer.innerHTML = `
        <div class="row">
            <div class="col-sm-8">
                <h4>Queue ID: <span class="text-danger">${qid}</span></h4>
                <h4>Queue Title: <span class="text-capitalize">${title}</span></h4>
                <h4>Access Type: ${owner}</h4>
            </div>
            <div class="col-sm-4">
                eikhane queue er QR code boshaile valo lagbo
            </div>
        </div>
        <div class="row gx-3 mt-4">
            <div class="col-sm-4">
                <div class="p-3 bg-light rounded-3">
                    <h4 class="text-center">Counter</h4>
                    <ul id="counterListLi">
                    </ul>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="p-3 bg-light rounded-3">
                    <h4 class="text-center">Desk</h4>
                    <ul id="deskListLi">
                    </ul>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="input-group">
					<input id="invitedEmailInput" type="Email" class="form-control" placeholder="Inviete Someone" aria-label="Recipient's username with two button addons">
					<select id="invitedEmailType" class="form-select" aria-label="Default select example">
						<option value="Desk">Desk</option>
						<option value="Counter">Counter</option>
					</select>
					<button id="invitedEmailButton" class="btn" type="button"><i class="fas fa-plus"></i></button>
				</div>
                <div class="p-3 bg-light rounded-3">
                    <h4 class="text-center">invited list</h4>
                    <ul id="inviteListLi">
                    </ul>
                </div>
            </div>
        </div>

        <div class="my-4 text-center"><button id="loadAllPrevious" class="button fw-bold">Privious</button></div>
    `;

    if (counterList === undefined || counterList === null) {
        document.getElementById("counterListLi").innerHTML = `
            <li>Counter List is Empty</li>
        `;
    } else {
        let counterListKeys = Object.keys(counterList);
        for (const e of counterListKeys) {
            let email = counterList[e].email;
            email = filterPath(email);
            usersRef.child(email).once("value", function (snapshot) {
                if (snapshot != null) {
                    let counterListSingleLi = document.createElement("li");
                    counterListSingleLi.classList.add("bg-white");
                    counterListSingleLi.classList.add("mx-2");
                    counterListSingleLi.classList.add("rounded");
                    counterListSingleLi.innerHTML = `
                    <div class="row align-items-center">
                        <div class="col-9">
                            <div>Name: ${snapshot.val().name}</div>
                            <div>Email: ${antiFilterPath(email)}</div>
                            <div>Counter No: ${e}</div>
                        </div>
                        <div class="col-3">
                            <button class="removeFromCounter"><i class="fas fa-user-minus"></i></button>
                        </div>
                    </div>
                    `;

                    document
                        .getElementById("counterListLi")
                        .appendChild(counterListSingleLi);
                    document
                        .getElementById("counterListLi")
                        .addEventListener("click", (e) => {
                            if (e.target.classList[0] === "removeFromCounter") {
                                console.log(qid, email);
                                // Eikhane counter list theke remove er code likhbi(tawhid)
                            }
                        });
                }
            });
        }
    }

    if (deskList === undefined || deskList === null) {
        document.getElementById("deskListLi").innerHTML = `
            <li>Desk List is Empty</li>
        `;
    } else {
        let deskListKeys = Object.keys(deskList);
        for (const e of deskListKeys) {
            let email = deskList[e].email;
            email = filterPath(email);
            usersRef.child(email).once("value", function (snapshot) {
                if (snapshot != null) {
                    let deskListSingleLi = document.createElement("li");
                    deskListSingleLi.classList.add("bg-white");
                    deskListSingleLi.classList.add("mx-2");
                    deskListSingleLi.classList.add("rounded");
                    deskListSingleLi.innerHTML = `
                    <div class="row align-items-center">
                        <div class="col-9">
                            <div>Name: ${snapshot.val().name}</div>
                            <div>Email: ${antiFilterPath(email)}</div>
                            <div>Desk No: ${e}</div>
                        </div>
                        <div class="col-3">
                            <button class="removeFromDesk"><i class="fas fa-user-minus"></i></button>
                        </div>
                    </div>
                    `;

                    document
                        .getElementById("deskListLi")
                        .addEventListener("click", (e) => {
                            if (e.target.classList[0] === "removeFromDesk") {
                                console.log(qid, email);
                                // Eikhane desk list theke remove er code likhbi(tawhid)
                            }
                        });

                    document
                        .getElementById("deskListLi")
                        .appendChild(deskListSingleLi);
                }
            });
        }
    }

    if (inviteList === undefined || inviteList === null) {
        document.getElementById("inviteListLi").innerHTML = `
            <li>Invite List is Empty</li>
        `;
    } else {
        let inviteListKeys = Object.keys(inviteList);
        for (const e of inviteListKeys) {
            let email = e;
            email = filterPath(email);
            usersRef.child(email).once("value", function (snapshot) {
                if (snapshot != null) {
                    let inviteListSingleLi = document.createElement("li");
                    inviteListSingleLi.classList.add("bg-white");
                    inviteListSingleLi.classList.add("mx-2");
                    inviteListSingleLi.classList.add("rounded");
                    inviteListSingleLi.innerHTML = `
                    <div class="row align-items-center">
                        <div class="col-9">
                            <div>Name: ${snapshot.val().name}</div>
                            <div>Email: ${antiFilterPath(email)}</div>
                        </div>
                        <div class="col-3">
                            <button class="removeFromInvite"><i class="fas fa-user-minus"></i></button>
                        </div>
                    </div>
                    `;

                    document
                        .getElementById("inviteListLi")
                        .addEventListener("click", (e) => {
                            if (e.target.classList[0] === "removeFromInvite") {
                                console.log(qid, email);
                                // Eikhane desk list theke remove er code likhbi(tawhid)
                            }
                        });

                    document
                        .getElementById("inviteListLi")
                        .appendChild(inviteListSingleLi);
                }
            });
        }
    }

    document.getElementById("loadAllPrevious").addEventListener("click", () => {
        allPreviousLoader();
        prevContainer.classList.add("row");
        prevContainer.classList.remove("d-block");
    });
};

prevContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        if (e.target.name === "seeQueueDetails") {
            seeDetails(e.target.id, "prev");
        }
    }
});
