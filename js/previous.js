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
                    if (snapshot.val() == null || snapshot.val() == undefined) {
                        //not found
                        prevContainer.innerHTML = "";
                        prevContainer.innerHTML = `
                            <div class="col-12">
                                <div class="text-center display-4 text-secondary">
                                    You have no previous queue yet...
                                </div>
                            </div>
                        `;
                    } else {
                        let qidList = Object.keys(snapshot.val());
                        let prevQueue = "";
                        prevContainer.innerHTML = "";
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
            prevContainer.innerHTML = "";
            prevContainer.innerHTML = `
            <div class="col-12 display-3 text-center text-secondary">
                <div><i class="fas fa-exclamation-circle"></i></div>
                <div><p>Please Login First</p></div>
            </div>
            `;
        }
    });
};

const myfunction = (params) => {
   
    prevContainer.innerHTML = "";
    prevContainer.classList.add("d-block");
    prevContainer.classList.remove("row");
    const {
        qid,
        email,
        access,
        owner,
        title,
        time,
        inviteList,
        counterList,
        deskList,
    } = params;

    if (access === "Owner") {
        prevContainer.innerHTML = `
            <div class="row">
                <div class="col-sm-8">
                    <h4>Queue ID: <span class="text-danger">${qid}</span></h4>
                    <h4>Queue Title: <span class="text-capitalize">${title}</span></h4>
                    <h4>Access Type: ${access}</h4>
                </div>
                <div class="col-sm-4">
                    <canvas id="qrcode"></canvas>
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
                        <input id="invitedEmailInputFromSD" type="Email" class="form-control" placeholder="Inviete Someone" aria-label="Recipient's username with two button addons">
                        <select id="invitedEmailTypeFromSD" class="form-select" aria-label="Default select example">
                            <option value="Desk">Desk</option>
                            <option value="Counter">Counter</option>
                        </select>
                        <button id="invitedEmailButtonFromSD" class="btn" type="button"><i class="fas fa-plus"></i></button>
                    </div>
                    <div class="p-3 bg-light rounded-3">
                        <h4 class="text-center">invited list</h4>
                        <ul id="inviteListLi">
                        </ul>
                    </div>
                </div>
            </div>

            <div class="d-block">
                <div class="d-flex justify-content-center my-5">
                    <button id="loadAllPrevious" class="button fw-bold">All Privious</button>
                    <button id="queueDeleteButton" class="button">Delete This Queue</button>
                </div>
            </div>
        `;
    } else {
        prevContainer.innerHTML = `
            <div class="row">
                <div class="col-sm-8">
                    <h4>Queue ID: <span class="text-danger">${qid}</span></h4>
                    <h4>Queue Title: <span class="text-capitalize">${title}</span></h4>
                    <h4>Access Type: ${access}</h4>
                </div>
                <div class="col-sm-4">
                    <canvas id="qrcode"></canvas>
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
                    <div class="p-3 bg-light rounded-3">
                        <h4 class="text-center">invited list</h4>
                        <ul id="inviteListLi">
                        </ul>
                    </div>
                </div>
            </div>

            <div class="d-block">
                <div class="d-flex justify-content-center my-5">
                    <button id="loadAllPrevious" class="button fw-bold">All Privious</button>
                </div>
            </div>
        `;
    }

    new QRious({
        element: document.getElementById("qrcode"),
        value: qid,
    });

    if (counterList === undefined || counterList === null) {
        document.getElementById("counterListLi").innerHTML = `
            <li>Counter List is Empty</li>
        `;
    } else {
        let counterListKeys = Object.keys(counterList);
        const counterListLi = document.getElementById("counterListLi");
        counterListLi.innerHTML = "";
        for (const e of counterListKeys) {
            let email = counterList[e].email;
            email = filterPath(email);
            usersRef.child(email).once("value", function (snapshot) {
                if (snapshot != null) {
                    let counterListSingleLi = document.createElement("li");
                    counterListSingleLi.classList.add("bg-white");
                    counterListSingleLi.classList.add("mx-2");
                    counterListSingleLi.classList.add("rounded");

                    if (access === "Owner") {
                        counterListSingleLi.innerHTML = `
                        <div class="row bg-white my-2 align-items-center">
                            <div class="col-9">
                                <div>Name: ${snapshot.val().name}</div>
                                <div>Email: ${antiFilterPath(email)}</div>
                                <div>Counter No: ${e}</div>
                            </div>
                            <div class="col-3">
                                <button id="${email}" class="removeFromCounter"><i class="fas fa-user-minus"></i></button>
                            </div>
                        </div>
                        `;
                    } else {
                        counterListSingleLi.innerHTML = `
                        <div class="row bg-white my-2 align-items-center">
                            <div class="col-9">
                                <div>Name: ${snapshot.val().name}</div>
                                <div>Email: ${antiFilterPath(email)}</div>
                                <div>Counter No: ${e}</div>
                            </div>
                        </div>
                        `;
                    }

                    document
                        .getElementById("counterListLi")
                        .addEventListener("click", (e) => {
                            if (e.target.tagName === "BUTTON") {
                                deleteFromCounter(e.target.id, qid);
                                console.log(e.target.id);
                                e.stopImmediatePropagation();
                            }
                        });

                    counterListLi.appendChild(counterListSingleLi);
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
        const deskListLi = document.getElementById("deskListLi");
        deskListLi.innerHTML = "";

        for (const e of deskListKeys) {
            let email = deskList[e].email;
            email = filterPath(email);
            usersRef.child(email).once("value", function (snapshot) {
                if (snapshot != null) {
                    let deskListSingleLi = document.createElement("li");
                    deskListSingleLi.classList.add("bg-white");
                    deskListSingleLi.classList.add("mx-2");
                    deskListSingleLi.classList.add("rounded");

                    if (access === "Owner") {
                        deskListSingleLi.innerHTML = `
                        <div class="row bg-white my-2 align-items-center">
                            <div class="col-9">
                                <div>Name: ${snapshot.val().name}</div>
                                <div>Email: ${antiFilterPath(email)}</div>
                                <div>Desk No: ${e}</div>
                            </div>
                            <div class="col-3">
                                <button id="${email}" class="removeFromDesk"><i class="fas fa-user-minus"></i></button>
                            </div>
                        </div>
                        `;
                    } else {
                        deskListSingleLi.innerHTML = `
                        <div class="row bg-white my-2 align-items-center">
                            <div class="col-12">
                                <div>Name: ${snapshot.val().name}</div>
                                <div>Email: ${antiFilterPath(email)}</div>
                                <div>Desk No: ${e}</div>
                            </div>
                        </div>
                        `;
                    }

                    document
                        .getElementById("deskListLi")
                        .addEventListener("click", (e) => {
                            if (e.target.tagName === "BUTTON") {
                                deleteFromDesk(e.target.id, qid);
                                e.stopImmediatePropagation();
                            }
                        });

                    deskListLi.appendChild(deskListSingleLi);
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
        const inviteListLi = document.getElementById("inviteListLi");
        inviteListLi.innerHTML = "";
        for (const e of inviteListKeys) {
            let email = e;
            email = filterPath(email);
            usersRef.child(email).once("value", function (snapshot) {
                if (snapshot != null) {
                    let inviteListSingleLi = document.createElement("li");
                    inviteListSingleLi.classList.add("bg-white");
                    inviteListSingleLi.classList.add("mx-2");
                    inviteListSingleLi.classList.add("rounded");
                    let personAccess = snapshot.val().inviteList[qid];
                    if (access === "Owner") {
                        inviteListSingleLi.innerHTML = `
                        <div class="row bg-white my-2 align-items-center">
                            <div class="col-9">
                                <div>Name: ${snapshot.val().name}</div>
                                <div>Email: ${antiFilterPath(email)}</div>
                                <div>Access: ${personAccess}</div>
                            </div>
                            <div class="col-3">
                                <button id="${email}" class="removeFromInvite"><i class="fas fa-user-minus"></i></button>
                            </div>
                        </div>
                        `;
                    } else {
                        inviteListSingleLi.innerHTML = `
                        <div class="row bg-white my-2 align-items-center">
                            <div class="col-12">
                                <div>Name: ${snapshot.val().name}</div>
                                <div>Email: ${antiFilterPath(email)}</div>
                                <div>Access: ${personAccess}</div>
                            </div>
                        </div>
                        `;
                    }

                    document
                        .getElementById("inviteListLi")
                        .addEventListener("click", (e) => {
                            if (e.target.tagName === "BUTTON") {
                                deleteFromInviteLists(e.target.id, qid);
                                console.log(e.target.id);
                                e.stopImmediatePropagation();
                            }
                        });

                    inviteListLi.appendChild(inviteListSingleLi);
                }
            });
        }
    }

    document.getElementById("loadAllPrevious").addEventListener("click", () => {
        allPreviousLoader();
        prevContainer.classList.add("row");
        prevContainer.classList.remove("d-block");
    });

    document
        .getElementById("invitedEmailButtonFromSD")
        .addEventListener("click", () => {
            const newInvitedEmailFromSD = document.getElementById(
                "invitedEmailInputFromSD"
            ).value;
            const newInvitedEmailTypeFromSD = document.getElementById(
                "invitedEmailTypeFromSD"
            ).value;

            if (newInvitedEmailFromSD.length !== 0) {
                addToInvite(
                    newInvitedEmailFromSD,
                    qid,
                    newInvitedEmailTypeFromSD
                );
            }
        });

    document
        .getElementById("queueDeleteButton")
        .addEventListener("click", () => {
            deleteQueue(qid);
        });
};

prevContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        if (e.target.name === "seeQueueDetails") {
            seeDetails(e.target.id);
        }
    }
});
