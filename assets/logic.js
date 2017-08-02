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
		//app must calculate when next train will arrive
		var arrival = function(){
			//relative to current time
			var currentTime = date();
			console.log("Your current time is: " + currentTime);
			
		}

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
			console.log(childSnapshot.val());
			console.log(childSnapshot.val().trainName);
			console.log(childSnapshot.val().Destination);
			console.log(childSnapshot.val().firstTrainTime);
			console.log(childSnapshot.val().Frequency);
			//this code displays it in the table
			$(".name").html(childSnapshot.val().trainName);
			$(".destin").html(childSnapshot.val().Destination);
			$(".frequency").html(childSnapshot.val().Frequency);
		})
			
	});