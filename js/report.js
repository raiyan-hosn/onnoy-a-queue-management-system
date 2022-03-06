var reportRef = firebase.database().ref("report");
function submitReport(message) {
    let rid = createKey();

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            reportRef.child(rid).update({
                "reported by": user.email,
                message: message,
            });
        }
    });
}

document.getElementById("hangleReport").addEventListener("click", () => {
    let reportMessage = document.getElementById("reportMessage").value;
    if (reportMessage !== "") {
        submitReport(reportMessage);
    }
    reportMessage = "";
});
