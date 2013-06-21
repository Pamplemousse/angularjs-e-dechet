angular.module('geolocation', [])
.service('geolocation', function() {
    // Le centre de Bordeaux par défaut
    var userLocation = new google.maps.LatLng(44, -0);
    // var userLocation = new google.maps.LatLng(44.837912, -0.579541);
    return {
        getUserLocation: function () {
            return userLocation;
        },
        setUserLocation: function(params) {
            userLocation = new google.maps.LatLng(params.latitude, params.longitude);
        },
        autoSetUserLocation: function() {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
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