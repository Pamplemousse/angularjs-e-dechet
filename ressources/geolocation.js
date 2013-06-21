angular.module('geolocation', [])
.service('geolocation', function() {
    // Le centre de Bordeaux par défaut
    var userLocation;
    return {
        getUserLocation: function () {
            return userLocation;
        },
        setUserLocation: function(params, callback) {
            userLocation = new google.maps.LatLng(params.latitude, params.longitude);
            if (callback) {
              callback();
            }
        },
        autoSetUserLocation: function(callback) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              if (callback) {
                callback();
              }
            }, 
            function (error){
              switch(error.code){
                  case error.TIMEOUT:
                      console.log("Timeout");
                      break;
                  case error.POSITION_UNAVAILABLE:
                      console.log("Position unavailable");
                      break;
                  case error.PERMISSION_DENIED:
                      console.log("Permission denied");
                      break;
                  case error.UNKNOWN_ERROR:
                      console.log("Unknown error");
                      break;
                  default: break;
              }
            }
          );
        }
    };
});