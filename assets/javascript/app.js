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
$("#add-train-btn").off("click").on("click", function (event) {
    event.preventDefault();

    // console.log(event)

    var trainFirstTime = moment($("#first-time-input").val(), 'HH:mm');
    // Grabbing the user's input, using .val().trim()

    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainFirstTimeFormatted = trainFirstTime.format("HH:mm");
    var trainFrequency = $("#frequency-input").val().trim();
    var currentTime = moment();

    if (trainFirstTime > currentTime) {
        nextTrain = trainFirstTime;
    } else {
        var minutesPast = currentTime.diff(trainFirstTime, 'minutes');
        var remainder = minutesPast % trainFrequency;
        var minutesTilNextTrain = trainFrequency - remainder;
        nextTrain = currentTime.add(minutesTilNextTrain, 'minutes');
    }

    //   Temporary data via creating an object.

    var newTrain = {
        name: trainName,
        dest: trainDest,
        depart: trainFirstTimeFormatted,
        arrival: trainFrequency,
        nextTrain: nextTrain.format('HH:mm'),

    };

    // console.log(newTrain)

    // uploads the train data to the database
    database.ref().push(newTrain);

    // console log of current data points collected/entered
    // console.log(newTrain.name);
    // console.log(newTrain.dest);
    // console.log(newTrain.depart);
    // console.log(newTrain.arrival);

    // confirmation of the train being added once console logs are run.

    alert("Train successfully added");

    // This clears all text fields info

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
    // $("#arrival-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    // console.log(childSnapshot.val());



    // Store everything into a variable
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainDepart = childSnapshot.val().depart;
    var trainFrequency = childSnapshot.val().arrival;
    var nextTrainEta = childSnapshot.val().nextTrain;

    // console.log(trainName);
    // console.log(trainDest);
    // console.log(trainDepart);
    // console.log(trainFrequency);
    // console.log(nextTrainEta);




    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainDepart),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextTrainEta),
        // $("<td>").text(trainArrive),
        // $("<td>").text(duration),
        // $("<td>").text(eta),
    );


    $("#train-table > tbody").append(newRow);

    // format.moment();

});














