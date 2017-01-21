'use strict';

var loginGoogle = document.getElementsByClassName("login-google")[0];
loginGoogle.addEventListener("click", () => {
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithRedirect(provider);
});

var loginFacebook = document.getElementsByClassName("login-facebook")[0];
loginFacebook.addEventListener("click", () => {
       var provider = new firebase.auth.FacebookAuthProvider();
       firebase.auth().signInWithRedirect(provider);
});

firebase.auth().onAuthStateChanged(function(user) {
  console.log(`Current user ${user}`);
  if (user) {
    location.href = "statement.html"
  } else {
    // No user is signed in.
  }
});