Parse.initialize("lgAdW3MFp6eMnSdtkcYKXqsjwLDVPvzPWYYZa9V3", "lgAdW3MFp6eMnSdtkcYKXqsjwLDVPvzPWYYZa9V3");
PhotoObject = Parse.Object.extend("PhotoObject");

var htmlBuilder = "";

var currentLocation;


document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
	console.log("onDeviceReady()");
	navigator.geolocation.getCurrentPosition(getPoint, onError);
	console.log(pos);
		
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
	
	
	
	if($("#sumbitEventBtn").length === 1) {
		currentLocation=null;
		navigator.geolocation.getCurrentPosition(function(pos) {
			//store the long/lat
			currentLocation = {longitude:pos.coords.longitude, latitude:pos.coords.latitude};
			$("#sumbitEventBtn").removeAttr("disabled");
		}, function(err) {
			//Since geolocation failed, we can't allow the user to submit
			alert("Sorry, but we couldn't find your location.");
		});

    }
    
    $("#commentForm").on("submit", function(e) {
	e.preventDefault();
 
	//get values
	var photo = $("#photo").val();
	var location = $("#location").val();
        var caption=$("#caption").val();
 
	var comment = new PhotoObject();
	var point = new Parse.GeoPoint({latitude: currentLocation.latitude, longitude: currentLocation.longitude});
	comment.save(
			{
				photo:photo,
				location:location,
				caption:caption,
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
 
	});
	
	
	if($("#event").length === 1) {

		//Update status 
		$("#event").html("Loading Content...");

		navigator.geolocation.getCurrentPosition(function(pos) {
			var myLocation = new Parse.GeoPoint({latitude: pos.coords.latitude, longitude: pos.coords.longitude});

			//Begin our query
			var query = new Parse.Query(PhotoObject);
			//Only within 10 miles
			query.withinMiles("location", myLocation, 10);
			//only within last week
			var lastWeek = new Date();
			lastWeek.setDate(lastWeek.getDate()-7);
			query.greaterThan("createdAt", lastWeek);
			query.find({
				success:function(results) { getList(results,myLocation); },
				error: function(error) { alert("Error: " + error.code + " " + error.message); }
			});

		}, function(err) {
			//Since geolocation failed, we can't allow the user to submit
			alert("Sorry, we couldn't find your location.");
		},{timeout:30000,enableHighAccuracy:false});
    }
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
            + results[index].attributes.cost + '</ul>' + '</div>' +'<div class="small-2 columns">'+'<button data-text-swap="Going">Not Going</button>' + '</br>' + '<div class="friend-box">' + '<i class="fi-torso">' + " 3" + '</i>' + '</div>' + '</div>' + '</div>' + '</div>' + '</a>';
});
            $("#event").html(htmlBuilder);
        },
        
        error: function(error) {
        }
	
	
        
    });
	
}


var button = document.querySelectorAll("button")[0];
button.addEventListener('click', function() {
  if (button.getAttribute("data-text-swap") == button.innerHTML) {
    button.innerHTML = button.getAttribute("data-text-original");
  } else {
    button.setAttribute("data-text-original", button.innerHTML);
    button.innerHTML = button.getAttribute("data-text-swap");
  }
}, false);