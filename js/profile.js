firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        let email=user.email
        let name= user.displayName;
        let photoUrl= user.photoUrl;
    }

});