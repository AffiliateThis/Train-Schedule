var config = {
    apiKey: "AIzaSyAjlRCLi1FmELglOM0S0Pryb3RmIDq4cjc",
    authDomain: "claess2.firebaseapp.com",
    databaseURL: "https://claess2.firebaseio.com",
    projectId: "claess2",
    storageBucket: "claess2.appspot.com",
    messagingSenderId: "114630071946"
};
firebase.initializeApp(config);

// variable that references the database.

var database = firebase.database();

// this references the connections to the site or users.
var connectionsRef = database.ref("/connections");

// The button to add Trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    console.log(event)

})