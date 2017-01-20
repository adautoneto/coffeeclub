(function() {
	"use strict";

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyB1Q7yiewsZu74A6QNzm_SjbMv1WoI3F5E",
		authDomain: "coffeeclub-33a84.firebaseapp.com",
		databaseURL: "https://coffeeclub-33a84.firebaseio.com",
		storageBucket: "coffeeclub-33a84.appspot.com",
		messagingSenderId: "204712776659"
	};
	firebase.initializeApp(config);

	class UserPhoto extends HTMLElement
	{
		get signOutUrl() {
			return this.getAttribute("signout-url") || "/";
		}

		createdCallback() {			
			this.innerHTML = `
				<section id="user">
					<img id="photo" />
					<div><a id="logout" href="#">Sair</a></div>
				</section>
			`;

			var btnLogout = this.querySelector("#logout");
			btnLogout.addEventListener("click", this.logout.bind(this));
		}

		attachedCallback() {			
			firebase.auth().onAuthStateChanged(function(user) {
				if (user) {					
					this.name = user.displayName;
					this.email = user.email;
					this.photoUrl = user.providerData[0].photoURL;
					this.uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
					// this value to authenticate with your backend server, if
					// you have one. Use User.getToken() instead.
					var photo = this.querySelector("#photo");
					photo.src = this.photoUrl;
				}
				else location.href = this.signOutUrl;
			}.bind(this));
		}

		logout(evt) {
			evt.preventDefault();

			firebase.auth().signOut().then(function() {
				console.log('User logged out');
				location.href = this.signOutUrl;
			}, function(error) {
			// An error happened.
			});			
		}
	}

	document.registerElement("user-photo", UserPhoto);	
}());