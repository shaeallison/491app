
//map index 

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
        styles: [
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#e0efef"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#1900ff"
            },
            {
                "color": "#c0e8e8"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill"
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#7dcdcd"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 700
            }
        ]
    }
]
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
    
    var image = 'cameraPic'
        marker = new google.maps.Marker({
        position: currentLatLng,
        map: map,
        title: 'Current Location',
        icon: image
    });
    




    
/*For Browser testing. Comment out for app testing.*/

    var position ={
        coords:{latitude:35.913200, longitude:-79.055845}
    }
    console.log(position.coords.latitude);
    
    google.maps.event.addDomListener(window, 'load' ,generateMap(position));






