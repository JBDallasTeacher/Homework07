
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBh7EI1RbLnKvBg-UdcKbQfAW-nt2x73Sw",
    authDomain: "train-database-e40a1.firebaseapp.com",
    databaseURL: "https://train-database-e40a1.firebaseio.com",
    projectId: "train-database-e40a1",
    storageBucket: "train-database-e40a1.appspot.com",
    messagingSenderId: "109948639307"
};

firebase.initializeApp(config);

// 1. Linking to Firebase
var trainDatabase = firebase.database();


// 2. Button for adding Trains
$("#addTrainBtn").on("click", function (event) {

    event.preventDefault();

    // Transfer the input info into variables
    var trainName = $("#trainNameInput").val().trim();
    var trainDestination = $("#destinationInput").val().trim();
    var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
    var frequencyInput = $("#frequencyInput").val().trim();
    // alert(trainName);
    // logging out the input
    //console.log(trainName);
    //console.log(trainDestination);
    //console.log(trainTimeInput);
    //console.log(frequencyInput);

    // Creates a record of the new train temporaly
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        trainTime: trainTimeInput,
        frequency: frequencyInput,
    };

    // Record will be push into the firebase
    trainDatabase.ref().push(newTrain);

    // clear text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#trainTimeInput").val("");
    $("#frequencyInput").val("");

    // Prevents page from refreshing
    //return false;
});

trainDatabase.ref().on("child_added", function (childSnapshot, prevChildKey) {
    alert("entro");
    console.log(childSnapshot.val());

    // assign firebase snapshots into new variables.
    var firebaseName = childSnapshot.val().trainName;
    var firebaseDestination = childSnapshot.val().destination;
    var firebaseTrainTimeInput = childSnapshot.val().trainTime;
    var firebaseFrequency = childSnapshot.val().frequency;

    var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
    var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency;
    var minutes = firebaseFrequency - timeRemainder;

    var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

    // logging out for correct times and info
    console.log(minutes);
    console.log(nextTrainArrival);
    console.log(moment().format("hh:mm A"));
    console.log(nextTrainArrival);
    console.log(moment().format("X"));

    // Append train info to table on page
    $("#trainTable > tbody").append(
        $("<tr><td>") + Text(firebaseName),
        $("<tr><td>") + Text(firebaseDestination),
        $("<tr><td>") + Text(firebaseFrequency),
        $("<tr><td>") + Text(firebaseTrainTimeInput),
        $("<tr><td>") + Text(minutes)
    )
    });


