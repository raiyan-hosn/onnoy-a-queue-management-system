const mainUi = (param) => {
    const mainQueue = document.getElementById("main-queue");
    mainQueue.classList.add("container");
    mainQueue.classList.add("main-queue");

    const {qid,inviteList, owner,tittle,time,type,counterList,deskList,waitingList, serviceList} = param;


    mainQueue.innerHTML = `
        <div class="row mb-5">
            <div class="col-md-9 mb-5">
                <div class="counter-status">
                    <div class="row px-3 py-4">
                        <div class="col-md-6">
                            <div class="running-serial text-center">
                                <div class="running-serial-no">
                                    <h1 id="serial-no" class="serial-no"></h1>
                                </div>
                                <div class="counter-no">
                                    <h2 id="counter-no" class="m-0 pb-5"></h2>
                                </div>
                            </div>
                            <div class="queue-info my-5">
                                <div class="row justify-content-center align-items-center">
                                    <div class="qr-code-image col-4">
                                        <img src="https://img.freepik.com/free-vector/vector-qr-code-sample-isolated_255502-275.jpg?size=338&ext=jpg" alt="" />
                                    </div>
                                    <div class="this-queue-info col-8">
                                        <h5 id="queue-title"></h5>
                                        <h4 id="queue-id-ui" class="fw-bolder text-secondary"></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 px- 2 py-3 in-service-area mt-md-0 mt-sm-4 position-relative">
                            <h3 class="text-center in-service">In Service</h3>
                            <div id="in-service-members" class="mx-2 in-service-members">
                            </div>
                            <div id="callPeopleBtn" class="add-in-service"></div>
                        </div>
                    </div>
                </div>
                <div class="notice-area mt-4">
                    <div class="row justify-content-center align-items-center px-3 ">
                        <div class="col-3 py-3 notice-time"><h3>02:45 PM</h3></div>
                        <div class="col-9 py-3 notice-details position-relative">
                            <h3 class="fw-bolder">Lunch Break Till 03:00 PM Lunch Break Till 03:00 PM Lunch Break Till 03:00 PM</h3>
                            <div id="edit-notice" class="edit-notice">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 people-waitng p-3 position-relative">
                <h3 class="text-center py-3">People Waiting</h3>
                <div id="waiting-member" class="mx-2 waiting-member">
                </div>
                <div id="add-waiting-member" class="add-waiting-member">
                </div>
            </div>
        </div>
    `;
    

    // queue title in ui 
    const queueTitle = document.getElementById("queue-title");
    queueTitle.innerText = `${tittle}`
    // queue id in ui 
    const queueIdUi = document.getElementById("queue-id-ui");
    queueIdUi.innerText = `${qid}`;

    // notice in ui
    const editNotice = document.getElementById("edit-notice");
    editNotice.innerHTML = `<button id="editNoticeBtn"><i class="fas fa-edit"></i></i></button>`;


    ////////////////

    const callPeopleBtn = document.getElementById("callPeopleBtn");
    const addWaitingPeople = document.getElementById("add-waiting-member");

    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    sleep(2500).then(() => {
        qidRef = queuesRef.child(qid);
        email = filterPath(getUserEmail());
        qidRef.child("deskList").once("value", function (snapshot) {
            keys = Object.keys(snapshot.val());
            flag = false;
            for (let i = 0; i < keys.length; i++) {
                if (snapshot.val()[keys[i]]['email'] == email) {
                    flag = true;
                    break;
                }
                else {
                    //console.log(snapshot.val()[keys[i]]['email']);
                }
            }
            if (flag) {

                addWaitingPeople.addEventListener("click", () => {
                    console.log("add people button clicked");
                });
                addWaitingPeople.innerHTML = `<button id="addPeopleBtn"><i class="fas fa-user-plus"></i></button>`;
            }
            else {
                //return false
            }
        });



        qidRef.child("counterList").once("value", function (snapshot) {
            keys = Object.keys(snapshot.val());
            flag = false;
            for (let i = 0; i < keys.length; i++) {
                if (snapshot.val()[keys[i]]['email'] == email) {
                    flag = true;
                    break;
                }
                else {
                    //console.log(snapshot.val()[keys[i]]['email']);
                }
            }
            if (flag) {
                
                    callPeopleBtn.addEventListener("click", () => {
                    console.log("call people button clicked");
                });
                callPeopleBtn.innerHTML = `<button id="callPeopleBtn"><i class="fas fa-user-plus"></i></button>`;
            }
            else {
                //return false
            }
        });

    });
    

    // in service member list ui rendering code ... 

    const inServicePeople = document.getElementById("in-service-members");
    const serialNo = document.getElementById("serial-no");
    const counterNo = document.getElementById("counter-no");

    const arrInServicePeople = Object.keys(serviceList);
    console.log(arrInServicePeople);
    serialNo.innerText = `${arrInServicePeople[arrInServicePeople.length - 1]}`;
    counterNo.innerText = `counter no: ${serviceList[arrInServicePeople.length]["counter"]}`;

    for(let i = arrInServicePeople.length - 1; i >= 0; i--) {
        const {name, counter} = serviceList[arrInServicePeople[i]];
        console.log(name, counter);
        const singleInServiceMember = document.createElement("h4");
        singleInServiceMember.innerText = `${arrInServicePeople[i]} - ${name} / C - ${counter}`;
        inServicePeople.appendChild(singleInServiceMember);
    }




    // waiting member list ui rendering code...

    const waitingMember = document.getElementById("waiting-member");
    for(const [key, name ] of Object.entries(waitingList)) {
        const singleWaitingMember = document.createElement("h4");
        singleWaitingMember.innerText = `${key} - ${name}`;
        waitingMember.appendChild(singleWaitingMember);
    }

    





};

// join queue btn handler

const joinQueueBtn = document.getElementById("joinQueueBtn");

joinQueueBtn.addEventListener("click", ()=> {
    const joinQueueText = document.getElementById("joinQueueText");
    if(joinQueueText.value !== ""){
        joinQueue(joinQueueText.value);
    }
});