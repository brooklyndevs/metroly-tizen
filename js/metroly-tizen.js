window.onload = function () {
    // TODO:: Do your initialization job
    console.log("init() called");

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back")
            tizen.application.getCurrentApplication().exit();
    });
    
    var offlineMsg = "Oops, can't get buses if the network is unavailable. ";
       
    if (!navigator.onLine) {
    	alert(offlineMsg);
    }
    
    window.addEventListener('offline', function () {
    	alert(offlineMsg);
    });   

};