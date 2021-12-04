
var queuesRef = firebase.database().ref("queues");
function createQueue(newQueue) {
    let qid = createKey();
    queueIdShow(qid);
    let tittle = newQueue.queueTitle;
    let time = newQueue.queueDate;
    let type = newQueue.queueDeskType;
    let inviteList = newQueue.invitedEmails;
    let owner = filterPath(getUserEmail());
    let notice="";
    let lastSL=0;
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
            inviteList: objInvite,
            notice: notice,
            lastSL: lastSL
        });
    addToPrevious(owner,qid,"owner");
}
function addToPrevious(email,qid,access){
    email=filterPath(email);
    usersRef.child(email+"/previousList").update({
        [qid]: access
    });
}
function addToCounter(email,qid){
    qIdRef=queuesRef.child(qid);
    email= filterPath(email);
    qIdRef.child("counterList").once("value",function(snapshot){
        if(snapshot.val()==null){
            qIdRef.child("counterList").update(
                {
                    "1":{
                        "email":email
                    }
                }
            );

        }else{
            let lastKey= Object.keys(snapshot.val())[Object.keys(snapshot.val()).length-1];
            lastKey= parseInt(lastKey)+1;
            qIdRef.child("counterList").update(
                {
                    [lastKey]: {
                        "email": email
                    }
            });
        }
       
    });
}
function addToDesk(email,qid){
    qIdRef=queuesRef.child(qid);
    email= filterPath(email);
    qIdRef.child("deskList").once("value",function(snapshot){
        if(snapshot.val()==null){
            qIdRef.child("deskList").update(
                {
                    "1":{
                        "email":email
                    }
                }
            );

        }else{
            let lastKey= Object.keys(snapshot.val())[Object.keys(snapshot.val()).length-1];
            lastKey= parseInt(lastKey)+1;
            qIdRef.child("deskList").update(
                {
                    [lastKey]: {
                        "email": email
                    }
            });
        }
       
    });
}
function deleteFromInviteLists(email,qid){
    email=filterPath(email);
    //remove from qid
    queuesRef.child(qid+"/inviteList/"+email).remove();

    //remove from userid
    usersRef.child(email+"/inviteList/"+qid).remove();

} 
function acceptInvitation(email,qid,access){
    if(access=="Counter"){
        addToCounter(email,qid);
    }
    else if(access=="Desk"){
        addToDesk(email,qid);
    }
    //add to previous
    addToPrevious(email,qid,access);
    //delete from invite.
    deleteFromInviteLists(email,qid);
}
function declineInvitation(email,qid){
    deleteFromInviteLists(email,qid);
}
function joinQueue(qid) {
    queuesRef.child(qid).on("value", function (snapshot) {
        if (snapshot.val() == null) {
            failToJoin();
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
            let notice=snapshot.val().notice;
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
                serviceList,
                notice
            };

            // console.log(waitingList);

            mainUi(param);

        }
    });

}
function addPeople(qid, name) {
    console.log("addPeople fuction called");
    qRef = queuesRef.child(qid);
    qRef.child("lastSL").once("value", function (snapshot) {
        if(snapshot.val()==null){
           
        }else{
           
       
            let serialNo= snapshot.val()+1;
            
            qidRef = queuesRef.child(qid).update({
                lastSL: serialNo
            });
            queuesRef.child(qid + "/waitingList").update(
                {
                    [serialNo]: name
                }
            );
        }
        
    });
}
function callPeople(qid,counter) {
    
    qidRef = queuesRef.child(qid);
    qidRef.child("waitingList").once("value", function (snapshot) {
      if(snapshot.val()==null){

      }else{
        let firstKey=Object.keys(snapshot.val())[0];
        let peopleName=snapshot.val()[firstKey];
        
        //remove person from waiting list
        qidRef.child("waitingList/" + firstKey).remove();

        //add person to service list
        qidRef.child("serviceList/"+firstKey).set({
            counter: counter,
            name: peopleName
        });

      }
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
function updateNoticeBoard(qid,notice)
{

    qidRef = queuesRef.child(qid).update({
        notice: notice
    });
    
    
}
