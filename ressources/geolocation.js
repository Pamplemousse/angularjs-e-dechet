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
                      alert("Géolocalisation : Timeout");
                      callback(error);
                      break;
                  case error.POSITION_UNAVAILABLE:
                      alert("Géolocalisation : Position unavailable");
                      callback(error);
                      break;
                  case error.PERMISSION_DENIED:
                      alert("Géolocalisation : Permission denied");
                      callback(error);
                      break;
                  case error.UNKNOWN_ERROR:
                      alert("Géolocalisation : Unknown error");
                      callback(error);
                      break;
                  default: break;
              }
            }
          );
        }
    };
});