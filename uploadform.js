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
	var photo = $("#photo").val();
	var caption = $("#caption").val();
	var location = $("#location").val();
	var school = $("#school").val();


 
	var comment = new PhotoObject();
	var point = new Parse.GeoPoint({latitude: currentLocation.latitude, longitude: currentLocation.longitude});
	comment.save(
			{
				photo:photo,
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
            console.log(results[index].attributes.photo);
	    console.log(results[index].id);

            htmlBuilder +=  '<div class="box">' + '<div class="row">' + '<div class="small-10 columns">' + '<ul>' + '</br>' + results[index].attributes.photo + '</br>' + results[index].attributes.caption + '</br>' + " Location: " + results[index].attributes.location + '</ul>' + '</div>' + '<div class="small-1 columns">'+ '</div>'+ '</br>' + '</br>' +
	    '<div class="friend-box">' + '<i class="fi-torso"></i> ' + '' + '</div>' + '</div>' +'</div>' + '</div>';
});
            $("#file").html(htmlBuilder);
	    buttonClick();
        },
	
        
        error: function(error) {
        }
	
	
        
    });
	
}



