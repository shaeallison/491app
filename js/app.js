

document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is Ready
function onDeviceReady() {
    console.log("onDeviceReady()");
    navigator.geolocation.getCurrentPosition(generateMap, onError);
    
}


function capturePhoto() {
    console.log("capturePhoto()");
    navigator.camera.getPicture(uploadPhoto,null,{sourceType:0, destinationType:0, quality:60,});
}



function uploadPhoto(data){
    //send file to server
    console.log("uploadPhoto()");
   
   cameraPic.src = data;
        navigator.notification.alert(
            'Your photo has been uploaded', //message
            okay,                           //callback
            'Photo uploaded',               //title
            'OK'                            //buttonName
        );
}

     
function okay (){
        //Do Something
}




