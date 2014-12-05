Parse.initialize("lgAdW3MFp6eMnSdtkcYKXqsjwLDVPvzPWYYZa9V3", "IpsgowMm56E1TVYVvF3UC1x9gA6I8Lka4MId9HiP");
PhotoObject = Parse.Object.extend("PhotoObject");

var htmlBuilder = "";

var myLocation;


document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
	console.log("onDeviceReady()");

	};


//geolocation	
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
	
	
	
//geolocation		
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
	var school = $("#school").val();
	var geoPoint = $("#geoPoint").val();

 
	var comment = new PhotoObject();
	var geoPoint = new Parse.GeoPoint({latitude: currentLocation.latitude, longitude: currentLocation.longitude});
	comment.save(
			{
				photo:photo,
				caption:caption,
				location:location,
				school: school,
				geoPoint:geoPoint

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

}


function displayContent(){
	
	
	 
	var PhotoObject = Parse.Object.extend("photos");
	
	
	var query = new Parse.Query(PhotoObject);
	
	query.withinMiles("geopoint", myLocation, 10);
	var yesterday = new Date();
	yesterday.setDate(yesterday.getDate()-1);
	query.greaterThan("createdAt", yesterday);
	query.descending("createdAt");
	query.limit(10);
 
	query.find({
		success:function(results) {
			var s = "";
			for(var i=0; i<results.length; i++) {
				//Lame - should be using a template
				s += "<div class='row'>  ";
				var pic = results[i].get("picture");
				if(pic) {
					s += "<br/><img src='" + pic.url() + "' style='width: 100%;'>";
				}
				s += "</div> "
				
				s += "<p>"
				
				s += results[i].get("text");
				
				s += "</p>"
				
				
				
				
			}
			$("#content").html(s);
		},error:function(e) {
			
 
		}
	});
}

function onDeviceReady() {
	console.log("onDeviceReady()");
	var imagedata = "";
	page=1;
	navigator.geolocation.getCurrentPosition(gotGeo, errorGeo,{enableHighAccuracy: true, maximumAge: 5000, timeout: 5000 });
	
	
}

function gotGeo(position){
	
	lat=position.coords.latitude;
	long=position.coords.longitude;
	
	console.log(lat);
	console.log(long);
	
	myLocation = new Parse.GeoPoint({latitude: lat, longitude: long});
	displayContent();
	
}

function errorGeo(error){
	   alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
	
	
	
}




