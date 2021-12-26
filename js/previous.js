const prevContainer = document.getElementById("prev-container");

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
                        queuesRef.child(qid).on("value", function (snapshot) {
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
    console.log("invite list ", inviteList);
    console.log("counter list ", counterList[1]);
    console.log("desk list", deskList);
    let counterListLi = ``;
    if (counterList === undefined) {
        counterListLi = `No one is in the Counter List`;
    } else {
        for (const e of counterList[1]) {
            console.log(counterListLi);
            const li = `<li>${e}</li>`;
            counterListLi = counterListLi + li;
        }
    }
    let invitedListLi = ``;
    if (inviteList === undefined) {
        invitedListLi = `No one is in the Invited List`;
    } else {
        for (const e in inviteList) {
            const li = `<li>${e}</li>`;
            invitedListLi = invitedListLi + li;
        }
    }

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
                    <ul>
                        ${counterListLi}
                    </ul>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="p-3 bg-light rounded-3">
                    <h4 class="text-center">Desk</h4>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="p-3 bg-light rounded-3">
                    <h4 class="text-center">invited list</h4>
                    <ul>
                        ${invitedListLi}
                    </ul>
                </div>
            </div>
        </div>
    `;
};

prevContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        if (e.target.name === "seeQueueDetails") {
            seeDetails(e.target.id, "prev");
        }
    }
});
