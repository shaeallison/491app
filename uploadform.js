Parse.initialize("lgAdW3MFp6eMnSdtkcYKXqsjwLDVPvzPWYYZa9V3", "IpsgowMm56E1TVYVvF3UC1x9gA6I8Lka4MId9HiP");
PhotoObject = Parse.Object.extend("PhotoObject");

var htmlBuilder = "";

var myLocation;

var imagedata = "";

document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
	console.log("onDeviceReady()");
	console.log(pos);

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
	var file = $("#file").val();
	var caption = $("#caption").val();
	var location = $("#location").val();
	var school = $("#school").val();


 
	var comment = new PhotoObject();
	var point = new Parse.GeoPoint({latitude: currentLocation.latitude, longitude: currentLocation.longitude});
	comment.save(
			{
				file:file,
				caption:caption,
				location:location,
				school: school,
				geoPoint:point

			},{
				success:function(object) {
					console.log("Saved object");
					alert("You've uploaded a photo");
				},

		});
 
	
	
	

    
    
    });
});


/*
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
*/

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


/* HTML KBWEEKS */

function getList(PhotoObject){
    console.log("getList" + PhotoObject);
    var query = new Parse.Query(PhotoObject);
    console.log(query);
    query.descending("createdAt");
    query.find({
        success: function(results) {
            //console.log(results);
            $.each(results, function( index, value ) {
            console.log(results[index].attributes.file);
	    console.log(results[index].id);

            htmlBuilder +=  '<div class="box">' + '<div class="row">' + '<div class="small-10 columns">' + '<ul>' + '</br>' + results[index].attributes.file + '</br>' + results[index].attributes.caption + '</br>' + " Location: " + results[index].attributes.location + '</ul>' + '</div>' + '<div class="small-1 columns">'+ '</div>'+ '</br>' + '</br>' +
	    '<div class="friend-box">' + '<i class="fi-torso"></i> ' + '' + '</div>' + '</div>' +'</div>' + '</div>';
});
            $("#files").html(htmlBuilder);
	    buttonClick();
        },
	
        
        error: function(error) {
        }
	
	
        
    });
	
}




/*Taylor's HTML
function displayContent(){
	
	
	var parseAPPID = "lgAdW3MFp6eMnSdtkcYKXqsjwLDVPvzPWYYZa9V3";
	var parseJSID = "IpsgowMm56E1TVYVvF3UC1x9gA6I8Lka4MId9HiP";
 
	//Initialize Parse
	Parse.initialize(parseAPPID,parseJSID);
	 
	var PhotoObject = Parse.Object.extend("photos");
	
	
	var query = new Parse.Query(PhotoObject);
	
	query.withinMiles("geoPoint", myLocation, 10);
	query.descending("createdAt");
	query.limit(25);
 
	query.find({
		success:function(results) {
			var s = "";
			for(var i=0; i<results.length; i++) {
				//Lame - should be using a template
				s += "<div class='row'>  ";
				var pic = results[i].get("photo");
				if(pic) {
					s += "<br/><img src='" + pic.url() + "' style='width: 100%;'>";
				}
				s += "</div> "
				
				s += "<p>"
				
				s += results[i].get("caption");
				
				s += "</p>"
				
				
				
				
			}
			$("#content").html(s);
		},error:function(e) {
			
 
		}
	});
}
*/


