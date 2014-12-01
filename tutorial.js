// When the WINDOW is ready, initialize page. We are going
// with Window rather than DOM to make sure that the Google
// APIs have loaded successfully.
$( window ).load(function(){
 
    // Get a reference to the DOM elements we are going to
    // need to reference.
    var photoContainer = $( "#photo" );
    var photo = photoContainer.find( "img" );
    var formContainer = $( "#upload-form" );
    var mapContainer = $( "#map" );
 
    // Get a referenced to the jQuery'ized window so we can
    // get its dimensions.
    //
    // NOTE: This will influence ALL future reference to the
    // window object inside this scope. Since we are in the
    // load() event handler, however, we can can always use
    // THIS if we want the direct window reference.
    var window = $( this );
 
 
    // Resize the container to fit the window.
    photoContainer.height(
        window.height() - formContainer.outerHeight()
    );
 
    // Check to see if we have a photo (uploaded).
    if (photo.size()){
 
        // Vertically center photo.
        photo.css(
            "margin-top",
            ((photoContainer.height() - photo.height()) / 2)
        );
 
    }
 
    // Resize map to take up the screen.
    mapContainer.height( window.height() );
    mapContainer.width( window.width() - photoContainer.width() - 1 );
 
 
    // ------------------------------------------------------ //
    // ------------------------------------------------------ //
 
 
    // Create the new Goole map controller using our container.
    var map = new google.maps.Map2( mapContainer[ 0 ] );
 
    // Center the map. We are going to re-center it based on the
    // latitude and longitude; but for default pursposes, let's
    // center it on the US.
    map.setCenter(
        new google.maps.LatLng( 38.925229, -96.943359 ),
        5
    );
 
    // Set the default UI elements (zoom + map types).
    map.setUIToDefault();
 
 
    // Now that we have loaded the map, let's check to see if we
    // have a latitude / longitude value (produced from the photo
    // upload and processing.
    if (this.latitude.length && this.longitude.length){
 
        // Add Title to image (for debugging).
        photo.attr(
            "title",
            (this.latitude + " / " + this.longitude)
        );
 
        // The phot was uploaded, so let's recenter the map to
        // the given location.
 
        // Create a new positional point.
        var point = new google.maps.LatLng(
            parseFloat( this.latitude ),
            parseFloat( this.longitude )
        );
 
        // Create a new marker to display on the map.
        var marker = new google.maps.Marker( point );
 
        // Add the marker to the map.
        map.addOverlay( marker );
 
        // Pan to the new marker (we can get the latitude and
        // longitude point from the marker.
        map.setZoom( 10 );
        map.panTo( marker.getLatLng() );
 
        // Open the HTML info box with the current latitude and
        // longitude values.
        map.openInfoWindowHtml(
            marker.getLatLng(),
            (
                ("Latitude: " + this.latitude + "<br />") +
                ("Longitude: " + this.longitude + "<br />") +
                ("<img src='" + photo.attr( "src" ) + "' width='100' />")
            )
        );
 
    }
 
});