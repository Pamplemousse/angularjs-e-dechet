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
        defaultSetUserLocation: function(callback) {
          // Les coordonnées de Bordeaux
          userLocation = new google.maps.LatLng(44.8386, -0.5783);
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
                      console.log("Géolocalisation : Timeout");
                      break;
                  case error.POSITION_UNAVAILABLE:
                      console.log("Géolocalisation : Position unavailable");
                      break;
                  case error.PERMISSION_DENIED:
                      console.log("Géolocalisation : Permission denied");
                      break;
                  case error.UNKNOWN_ERROR:
                      console.log("Géolocalisation : Unknown error");
                      break;
                  default: break;
              }
              if (callback) {
                callback(error);
              }
            }
          );
        }
    };
});