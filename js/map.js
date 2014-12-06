//map profile 

function onError(error) {
    console.log("onError()");
    alert('code: ' + error.code  + '\n' +
          'message: ' + error.message + '\n');
}

function generateMap(position) {
    console.log("generateMap()");
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    var currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
    var mapOptions = {
        //center:new google.maps.LatLng(-34.397, 150.644),
        center: currentLatLng,
        zoom: 15,
        
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
    


// create new marker?

var marker = new google.maps.Marker (point);

// Add the marker to the map.
map.addOverlay( marker);

//open the info box
map.openInfoWindowHtml (
    marker.getCurrentLatLng(),
    (
        ("<img src'" + photo.attr( "photo" ) + "' width='100' />")
    )
);
    
    
    
    
 
/*  
    var contentString1 = '<img class="image" src="img/oldwell.png">';
    var contentString2 = '<img class="image" src="img/oldwell.png">';
    var contentString3 = '<img class="image" src="img/hesnot.png">';
    var contentString4 = '<img class="image" src="img/latenight.png">';
    var contentString5 = '<img class="image" src="img/swain.png">';
    var contentString6 = '<img id="photo">';
    
    var image = 'img/image.png';
    
    var infowindow1 = new google.maps.InfoWindow({
      content: contentString1
    });
    var infowindow2 = new google.maps.InfoWindow({
      content: contentString2
    });
    var infowindow3 = new google.maps.InfoWindow({
      content: contentString3
    });
    var infowindow4 = new google.maps.InfoWindow({
      content: contentString4
    });
    var infowindow5 = new google.maps.InfoWindow({
      content: contentString5
    });
    

    var OLDWELL = new google.maps.LatLng(35.913025, -79.051218);
    var HESNOT = new google.maps.LatLng(35.913173, -79.056552);
    var LATENIGHT = new google.maps.LatLng(35.900448, -79.043973);
    var SWAIN = new google.maps.LatLng(35.911610, -79.053101);
    
    
    var marker1 = new google.maps.Marker({
        position: currentLatLng,
        map: map,
        title: 'Current Location'
    });
    
    var marker2 = new google.maps.Marker({
        position: OLDWELL,
        map: map,
        icon: image,
        title: 'Old Well'
    });
    
    var marker3 = new google.maps.Marker({
        position: HESNOT,
        map: map,
        icon: image,
        title: 'Hes Not Here'
    });
    
     var marker4 = new google.maps.Marker({
        position: LATENIGHT,
        map: map,
        icon: image,
        title: 'Late Night With Roy'
    });
    var marker5 = new google.maps.Marker({
        position: SWAIN,
        map: map,
        icon: image,
        title: 'Swain Hall'
    });
    
    google.maps.event.addListener(marker2, 'click', function() {
	infowindow2.open(map,marker2);
    });
    
    google.maps.event.addListener(marker3, 'click', function() {
	infowindow3.open(map,marker3);
    });
    
    google.maps.event.addListener(marker4, 'click', function() {
	infowindow4.open(map,marker4);
    });
    
    google.maps.event.addListener(marker5, 'click', function() {
	infowindow5.open(map,marker5);
    });
    
    google.maps.event.addListener(marker2, 'click', function() {
	infowindow2.open(map,marker2);
	infowindow1.close();
	infowindow3.close();
	infowindow4.close();
        infowindow5.close();
    });
    
    google.maps.event.addListener(marker3, 'click', function() {
	infowindow3.open(map,marker3);
	infowindow1.close();
	infowindow2.close();
	infowindow4.close();
        infowindow5.close();
    });
    
    google.maps.event.addListener(marker4, 'click', function() {
	infowindow4.open(map,marker4);
	infowindow1.close();
	infowindow2.close();
	infowindow3.close();
        infowindow5.close();
    });
    
    google.maps.event.addListener(marker5, 'click', function() {
	infowindow5.open(map,marker5);
	infowindow1.close();
	infowindow2.close();
	infowindow3.close();
        infowindow4.close();
    }); 
    
*/    

}




    
/*For Browser testing. Comment out for app testing. */

    var position ={
        coords:{latitude:35.913200, longitude:-79.055845}
    }
    console.log(position.coords.latitude);
    
    google.maps.event.addDomListener(window, 'load' ,generateMap(position));
    


//example photo marker
var LatLng = new google.maps.LatLng(35.912472, -79.051306)



