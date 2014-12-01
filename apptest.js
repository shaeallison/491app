Parse.initialize("lgAdW3MFp6eMnSdtkcYKXqsjwLDVPvzPWYYZa9V3", "IpsgowMm56E1TVYVvF3UC1x9gA6I8Lka4MId9HiP");
PhotoObject = Parse.Object.extend("PhotoObject");

var htmlBuilder = "";

var currentLocation;


document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
	console.log("onDeviceReady()");
	navigator.geolocation.getCurrentPosition(getPoint, onError);

	};

function getPoint(position) {
	lat=position.coords.latitude;
	long=position.coords.longitude;
	
	
	currentLocation = new Parse.GeoPoint({latitude: lat, longitude: long});
}

function onError(error) {
        console.log("onError()");
        alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    }




$(document).ready(function() {
        
	
	getList(PhotoObject);
	
	if($("#submitEventBtn").length === 1) {
		currentLocation=null;
		navigator.geolocation.getCurrentPosition(function(position) {
			//store the long/lat
			currentLocation = {longitude:position.coords.longitude, latitude:position.coords.latitude};
			console.log(pos);
			$("#sumbitEventBtn");
		}, function(err) {
			//Since geolocation failed, we can't allow the user to submit
			alert("Sorry, but we couldn't find your location.");
		});

	}
	
	
    
    $("#commentForm").on("submit", function(e) {
	e.preventDefault();
 
	//get values
	var photo = $("#photo").val();
	var caption = $("#caption").val();
	var location = $("#location").val();

 
	var comment = new PhotoObject();
	var point = new Parse.GeoPoint({latitude: currentLocation.latitude, longitude: currentLocation.longitude});
	comment.save(
			{
				photo:photo,
				caption:caption,
				location:location,
				geoPoint:point

			},{
				success:function(object) {
					console.log("Saved object");
					alert("You've created an event");
				},
				error:function(model, error) {
					console.log(":(");
				}
		});
 
	
		if($("#event").length === 1) {

		//Update status 
		$("#event").html("Loading Content...");

		navigator.geolocation.getCurrentPosition(getPoint, onError);
			

			//Begin our query
			var query = new Parse.Query(CommentObject);
			//Only within 10 miles
			query.withinMiles("geoPoint", currentLocation, 10);
			query.find({
				success:function(results) { getList(results,currentLocation); },
				error: function(error) { alert("Error: " + error.code + " " + error.message); }
			});

		
		
    }
	

    
    
    });
});




function getList(PhotoObject){
    console.log("getList" + PhotoObject);
    var query = new Parse.Query(PhotoObject);
    query.find({
        success: function(results) {
            console.log(results);
            $.each(results, function( index, value ) {
            console.log(results[index].attributes.cost);
            htmlBuilder +=  '<div class="box">' + '<div class="row">' + '<div class="small-9 columns">' + '<ul>' + results[index].attributes.name + '</br>' + results[index].attributes.venue + " : " + results[index].attributes.town + ", " + results[index].attributes.state +  '</br>' + results[index].attributes.day + " | " + results[index].attributes.time + '</br>'
            + results[index].attributes.cost + '</ul>' + '</div>' +'<div class="small-2 columns">'+'<input class="text-swap" value="Not Going" type="button" />' + '</br>' + '<div class="friend-box">' + '<i class="fi-torso">' + '<span class="counter"> 0</span>' + '</i>' + '</div>' + '</div>' + '</div>' + '</div>' + '</a>';
});
            $("#event").html(htmlBuilder);
	    buttonClick();
        },
        
        error: function(error) {
        }
	
	
        
    });
	
}

function buttonClick(){
	console.log("button");
//var button = document.querySelectorAll("button")[0];

$(".text-swap").on( "click", function() {
	console.log("clicked");
	var button = $(this);
	var counter = $(this).siblings(".counter");
	console.log(counter);
	console.log(button.attr('value'));
  if (button.attr('value') == "Not Going") {
	button.attr('value', 'Going');
  } else {
	button.attr('value', 'Not Going');

  }
  
});


	// Create a pointer to an object of class Point with id dlkj83d
	var Point = Parse.Object.extend("CommentObject");
	var point = new Point();
	point.id =  id;


	// Save
	point.save(null, {
	success: function(point) {
	  // Saved successfully.
	  console.log("success");
	},
	error: function(point, error) {
	  // The save failed.
	  // error is a Parse.Error with an error code and description.
	  console.log("fail");
	}
	});

}