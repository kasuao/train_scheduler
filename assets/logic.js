// alert("you are connected");
//connect to database
  var config = {
    apiKey: "AIzaSyCwSZIi4_Yd99MqSPUYp8zhx-eJSaQglk4",
    authDomain: "click-23039.firebaseapp.com",
    databaseURL: "https://click-23039.firebaseio.com",
    projectId: "click-23039",
    storageBucket: "click-23039.appspot.com",
    messagingSenderId: "724519016739"
  };
  //makes the connection to the database
  firebase.initializeApp(config);

 //variables
 var database = firebase.database();
 var name;
 var destination;
 var time;
 var frequency;
 var arrival;

//add train names
	//add name
	$("#submit").on("click", function(){

		console.log("Your submit button is working");
		//input name is equal to var name
		var name = $("#name").val().trim();
		console.log(name);
		//add destination
		var destination = $("#Destination").val().trim();
		console.log(destination);
		//add first train time ---in military time
		var time = $("#trainTime").val().trim();
		console.log(time);
		//add frequency
		var frequency = $("#Frequency").val().trim();
		console.log(frequency);
		//Current time
		var currentTime = moment().format('HH:MM');
		console.log("Your current time is: " + currentTime);
		//need to translate currentTime into 20120620 format
		//find the difference from first train time and current time
		var timeDiff = moment(time, currentTime).fromNow();
		console.log(timeDiff);
		//arrival time is equal to
		var arrival = timeDiff%frequency;
		console.log(arrival);
		//store data on firebase
		database.ref().push({
			trainName: name,
			Destination: destination,
			firstTrainTime: time,
			Frequency: frequency,


		})
			//retrieve all this info and show it in the table
		database.ref().on("child_added", function(childSnapshot){
			//logs it in the console for testing...IT WORKS!
			// console.log(childSnapshot.val());
			console.log(childSnapshot.val().trainName);
			console.log(childSnapshot.val().Destination);
			console.log(childSnapshot.val().firstTrainTime);
			console.log(childSnapshot.val().Frequency);
			//this code displays it in the table
			$("#newTrain").prepend("<tr><td>" + childSnapshot.val().trainName + "</td>" + "<td>" + childSnapshot.val().Destination + "</td>" + "<td>" + childSnapshot.val().Frequency + "</td>" +"<td>" + childSnapshot.val().arrival + "</td>" + "<td>" + "minutes away" + "</td>");
		})
			
	});