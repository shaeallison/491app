
//place functions for data connect here...
var ref = new Firebase("https://dazzling-fire-6030.firebaseio.com//locations");

function loadTrips(){
    var tripsToDisplay=3;
    var tripListRef = new Firebase('https://dazzling-fire-6030.firebaseio.com//locations');
    var tripListView = tripListRef.limit(tripsToDisplay);
    
    tripListRef.once('value', function(dataSnapshot) {
        var listItems = "";
        tripListView = dataSnapshot.val();
        console.log(tripListView);
        
    $.each(tripListView, function(key, val) {
        var location = [];
        
        console.log('Key: ' + key + ' Val: ' + val)
        location.push(key);
        $.each(val, function(key, val) {
            location.push(val);
        });
        
        listItems += '<li"><a href="#"><img src=" ' + location[4] + ' ">'
        listItems += '<h2>' + location[0] + "</h2>";
        listItems += '<p>' + location[3] + '</p></a></li>'
        
    });
    
    
    
    console.log(listItems);
    $("#trip-list").html(listItems);

});

}



function onDeviceReady() {
    //needed only for mobile deployment
    console.log("onDeviceReady()");
    loadTrips();
    go();
    updateCountry();
}

$( document ).ready(function() {
    //for browser use only
    console.log( "document ready!" );
    //function to populate menu
    loadTrips();
    //go();
    //updateCountry();
    //pushCountry();
    setCountry();

});

function go() {
        var searchTerm = prompt('Country?', 'Thailand');
        checkIfUserExists(searchTerm);
}

var DATA_LOCATION = 'https://dazzling-fire-6030.firebaseio.com//locations';

function termExistsCallback(searchTerm, exists) {
    if (exists) {
        alert('User: ' + searchTerm + ' exists!');
    } else {
        alert('User: ' + searchTerm + ' does not exist!');   
    }
}

function checkIfUserExists(searchTerm) {
    var termRef = new Firebase(DATA_LOCATION);
    termRef.child(searchTerm).once('value', function(snapshot) {
        var exists = (snapshot.val() !== null);
        console.log(exists);
        termExistsCallback(searchTerm, exists);
    
});
}

function updateCountry(){
    var value = prompt('Change the trans to:', '5000');
    
    var ref = new Firebase("https://dazzling-fire-6030.firebaseio.com//locations");
    console.log(ref);
    var countryRef = ref.child("Thailand");
    
    countryRef.update({
      "trans" : value  
    });
    console.log("done running updateCountry()")
}

function pushCountry(){
    //ref.push("USA");
    //var countryRef = ref.child("USA");
    ref.push({
        name: "USA",
        cost:"0",
        date:"20140401",
        desc: "See your homeland!",
        photo: "https://c1.staticflickr.com/3/2257/1706418822_67531aa58e_q.jpg"
    });
}

function setCountry(){
    ref.set({
        "USA":{
         cost:"0",
         date:"20140401",
         desc: "See your homeland!",
         photo: "https://c1.staticflickr.com/3/2257/1706418822_67531aa58e_q.jpg",
        }
    });
}
