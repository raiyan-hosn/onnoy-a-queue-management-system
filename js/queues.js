
var queuesRef = firebase.database().ref("queues");

function createQueue(newQueue) {
    let qid = createKey();
    let tittle = newQueue.queueTitle;
    let time = newQueue.queueDate;
    let type = newQueue.queueDeskType;
    let inviteList = newQueue.invitedEmails;
    let owner = filterPath(getUserEmail());
    if (!isSignedIn()) {
        return;
    }
    let objInvite = {};
    for (let i = 0; i < inviteList.length; i++) {
        let email = filterPath(inviteList[i][0]);
        let access = inviteList[i][1];

        objInvite[email] = access;

        usersRef
            .child(email + "/inviteList")
            .update({
                [qid]: access
            });
    }
    queuesRef.child(qid)
        .set({
            tittle: tittle,
            time: time,
            type: type,
            owner: owner,
            inviteList: objInvite
        });
}
function joinQueue(qid) {
    queuesRef.child(qid).on("value", function (snapshot) {
        if (snapshot.val() == null) {
            console.log("no queue found");
        }
        else {
            let inviteList = snapshot.val().inviteList;
            let owner = snapshot.val().owner;
            let tittle = snapshot.val().tittle;
            let time = snapshot.val().time;
            let type = snapshot.val().type;
            let counterList = snapshot.val().counterList;
            let deskList = snapshot.val().deskList;
            let waitingList = snapshot.val().waitingList;
            let serviceList = snapshot.val().serviceList;

            const param = {
                qid,
                inviteList, 
                owner,
                tittle,
                time,
                type,
                counterList,
                deskList,
                waitingList,
                serviceList
            };

            // console.log(waitingList);

            mainUi(param);

        }
    });

}
function addPeople(qid, name) {
    qRef = queuesRef.child(qid);
    qRef.child("waitingList").once("value", function (snapshot) {
        let lastKey = Object.keys(snapshot.val())[Object.keys(snapshot.val()).length-1];
       
        let serialNo;
        if(lastKey==null){
            //do something
        }else{
             serialNo= parseInt(lastKey)+1;
        }

        queuesRef.child(qid + "/waitingList").update(
            {
                [serialNo]: name
            }
        );
    });
}
function callPeople(qid,counter) {
    
    qidRef = queuesRef.child(qid);
    qidRef.child("waitingList").once("value", function (snapshot) {
        let firstKey=Object.keys(snapshot.val())[0];
        let peopleName=snapshot.val()[firstKey];
        
        //remove person from waiting list
        qidRef.child("waitingList/" + firstKey).remove();

        //add person to service list
        qidRef.child("serviceList/"+firstKey).set({
            counter: counter,
            name: peopleName
        });

    });
}

function canAddPeople(qid){
    qidRef = queuesRef.child(qid);
    email=filterPath(getUserEmail());
    qidRef.child("deskList").once("value",function(snapshot){
        keys=Object.keys(snapshot.val());
        flag=false;
        for(let i=0;i<keys.length;i++){
            if(snapshot.val()[keys[i]]['email']==email){
                flag=true;
                break;
            }
            else{
                console.log(snapshot.val()[keys[i]]['email']);
            }
        }
            if(flag){
                //return true
            }
            else{
                //return false
            }
    });

}
function canCallPeople(qid){
    qidRef = queuesRef.child(qid);
    email=filterPath(getUserEmail());
    qidRef.child("counterList").once("value",function(snapshot){
        keys=Object.keys(snapshot.val());
        flag=false;
        for(let i=0;i<keys.length;i++){
            if(snapshot.val()[keys[i]]['email']==email){
                flag=true;
                break;
            }
            else{
                console.log(snapshot.val()[keys[i]]['email']);
            }
        }
            if(flag){
                //return true
            }
            else{
                //return false
            }
    });

}
function canUpdateNoticeboard(qid){
    qidRef = queuesRef.child(qid);
    email=filterPath(getUserEmail());
    qidRef.child("owner").once("value",function(snapshot){
       if(snapshot.val()==email){
           // return true
         
       }
       else{
           //return false
       }
    });
}
function updateNoticeBoard(qid)
{
    
}
var arr2 = [
    ["raiyan.hosn@gmail.com", "desk"],
    ["raiyan15-10258@diu.edu.bd", "counter"]
];