const mainQueue = document.getElementById("main-queue");
mainQueue.classList.add("container");
mainQueue.classList.add("main-queue");

const mainUi = (param) => {


    let { qid, inviteList, owner, tittle, time, type, counterList, deskList, waitingList, serviceList, notice } = param;
    if(serviceList==null){
        serviceList= {
            "0":{
                "name": "None is in service",
                "counter": "0"
            },
          
        }
    }
    if(waitingList==null){
        waitingList={
            "0": "None is waiting"
        }
    }

    mainQueue.innerHTML = `
        <div class="row mb-3">
            <div class="col-md-9">
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
            </div>
            <div class="col-md-3 people-waitng p-3 position-relative">
                <h3 class="text-center py-3">People Waiting</h3>
                <div id="waiting-member" class="mx-2 waiting-member">
                </div>
                <div id="add-waiting-member" class="add-waiting-member">
                </div>
            </div>
        </div>
        <div class="text-center">
            <div id="live-time" class="display-3">Time Is</div>
        </div>
        <marquee id="notice-board" class="bg-warning fw-bolder rounded p-2 display-4">${notice}</marquee>

        <!-- Modal addPeopleModa-->
        <div class="modal fade" id="addPeopleBtnModal" tabindex="-1" role="dialog" aria-labelledby="addPeopleBtnModalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Add People</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input id="newPeopleInput" class="form-control" type="text" placeholder="Enter the name...">
                </div>
                <div class="modal-footer">
                    <button id="newPeopleAdd" type="button" class="btn btn-primary" data-dismiss="modal">Add</button>
                </div>
                </div>
            </div>
        </div>

        <!-- Modal Notice edit-->
        <div class="modal fade" id="notice" tabindex="-1" role="dialog" aria-labelledby="noticeTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Notice</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input id="newNoticeInput" class="form-control" type="text" placeholder="Enter the name...">
                </div>
                <div class="modal-footer">
                    <button id="newNoticeAdd" type="button" class="btn btn-primary" data-dismiss="modal">Post Notice</button>
                </div>
                </div>
            </div>
        </div>
    `;

    let liveTime = document.getElementById('live-time');

    function getLiveTime() {
    let d = new Date();
    let s = d.getSeconds();
    let m = d.getMinutes();
    let h = d.getHours();
    liveTime.textContent = 
        ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
    }

    setInterval(getLiveTime, 1000);


    // queue title in ui 
    const queueTitle = document.getElementById("queue-title");
    queueTitle.innerText = `${tittle}`
    // queue id in ui 
    const queueIdUi = document.getElementById("queue-id-ui");
    queueIdUi.innerText = `${qid}`;

    // notice in ui
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            
            qidRef = queuesRef.child(qid);
            email = filterPath(user.email);
            qidRef.child("owner").once("value", function (snapshot) {
                if (snapshot.val() == email) {
                    // return true
                    const editNotice = document.getElementById("edit-notice");
                    editNotice.innerHTML = `<button id="editNoticeBtn" data-toggle="modal" data-target="#notice" type="button"><i class="fas fa-edit"></i></button>`;
                    editNotice.addEventListener("click", () => {
                        // Edit notice Btn works ....
                       
                        const newNoticeAdd = document.getElementById("newNoticeAdd");
                        newNoticeAdd.addEventListener("click", () => {
                            const newNoticeInput = document.getElementById("newNoticeInput");
                            if (newNoticeInput.value !== "") {
                                console.log(newNoticeInput.value);
                                updateNoticeBoard(qid,newNoticeInput.value)
                                newNoticeInput.value = "";
                            }
                        });
                    });
                
                }
                else {
                    //return false
                }
            });
         
        

        } else {
            // No user is signed in.
        }
    });
  
    ////////////////

    const callPeopleBtn = document.getElementById("callPeopleBtn");
    const addWaitingPeople = document.getElementById("add-waiting-member");

  
    firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
		  

            qidRef = queuesRef.child(qid);
            email = filterPath(user.email);
            
            qidRef.child("deskList").once("value", function (snapshot) {
                if(snapshot.val()==null){
                    return;
                }
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
    
                        /// get new people works...
                        const newPeopleAdd = document.getElementById("newPeopleAdd");
                        newPeopleAdd.addEventListener("click", () => {
                            const newPeopleInput = document.getElementById("newPeopleInput");
                            if (newPeopleInput.value !== "") {
                                console.log(qid, newPeopleInput.value);
                                addPeople(qid, newPeopleInput.value);
                                newPeopleInput.value = "";
                            }
                        });
                    });
                    addWaitingPeople.innerHTML = `<button data-toggle="modal" data-target="#addPeopleBtnModal" type="button" id="addPeopleBtn"><i class="fas fa-user-plus"></i></button>`;
                }
                else {
                    //return false
                }
            });
    
            qidRef.child("counterList").once("value", function (snapshot) {
                if(snapshot.val()==null){
                    return;
                }
                keys = Object.keys(snapshot.val());
                flag = false;
                myCounterNumber="";
                for (let i = 0; i < keys.length; i++) {
                    if (snapshot.val()[keys[i]]['email'] == email) {
                        flag = true;
                        myCounterNumber=keys[i];
                        break;
                    }
                    else {
                        //console.log(snapshot.val()[keys[i]]['email']);
                    }
                }
                if (flag) {
    
                    callPeopleBtn.addEventListener("click", () => {
                        console.log("call people button clicked");
                        if(myCounterNumber!=""){
                            callPeople(qid,myCounterNumber);
                        }
    
                    });
                    callPeopleBtn.innerHTML = `<button id="callPeopleBtn"><i class="fas fa-user-plus"></i></button>`;
                }
                else {
                    //return false
                }
            });
    

		} else {
		  // No user is signed in.
		}
	  });
 
    // in service member list ui rendering code ... 

    const inServicePeople = document.getElementById("in-service-members");
    const serialNo = document.getElementById("serial-no");
    const counterNo = document.getElementById("counter-no");

    const arrInServicePeople = Object.keys(serviceList);
    serialNo.innerText = `${arrInServicePeople[arrInServicePeople.length - 1]}`;
    
    counterNo.innerText = `counter no: ${serviceList[arrInServicePeople[arrInServicePeople.length-1]]["counter"]}`;
    
    for (let i = arrInServicePeople.length - 1; i >= 0; i--) {
        const { name, counter } = serviceList[arrInServicePeople[i]];
        const singleInServiceMember = document.createElement("h4");
        singleInServiceMember.innerText = `${arrInServicePeople[i]} - ${name} / C - ${counter}`;
        inServicePeople.appendChild(singleInServiceMember);
    }




    // waiting member list ui rendering code...

    const waitingMember = document.getElementById("waiting-member");
    for (const [key, name] of Object.entries(waitingList)) {
        const singleWaitingMember = document.createElement("h4");
        singleWaitingMember.innerText = `${key} - ${name}`;
        waitingMember.appendChild(singleWaitingMember);
    }

    const newPeopleAdd = document.getElementById("newPeopleAdd");
    // console.log(newPeopleAdd);




};

// join queue btn handler

const joinQueueBtn = document.getElementById("joinQueueBtn");

joinQueueBtn.addEventListener("click", () => {
    const joinQueueText = document.getElementById("joinQueueText");
    if (joinQueueText.value !== "") {
        joinQueue(joinQueueText.value);
    }
    joinQueueText.value = "";
});

const failToJoin = () => {
    mainQueue.innerHTML = `
        <p class="text-center font-weight-bold h3 text-danger">Invalid Queue Id</p>
    `;
};