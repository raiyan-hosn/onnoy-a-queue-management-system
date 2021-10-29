var queuesRef = firebase.database().ref("queues");

function createQueue(newQueue) {
    let id= createKey();
    let tittle= newQueue.queueTitle;
    let time=newQueue.queueDate;
    let type=newQueue.queueDeskType;
    let inviteList=newQueue.invitedEmails;
    let owner = filterPath(getUserEmail());
    if (!isSignedIn()) {
        return;
    }
    let objInvite={};
    for (let i = 0; i < inviteList.length; i++) {
        let email= filterPath(inviteList[i][0]);
        let access= inviteList[i][1];

        objInvite[email]=access;

        usersRef
            .child(email+"/inviteList")
            .update({
                [id]: access
            });
    }
    queuesRef.child(id)
        .set({
            tittle: tittle,
            time: time,
            type: type,
            owner: owner,
            inviteList: objInvite
        });
}

var arr2 = [
    ["raiyan.hosn@gmail.com", "desk"],
    ["raiyan15-10258@diu.edu.bd", "counter"]
];