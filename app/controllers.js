function ListCtrl($scope, $location, Garbage, geolocation) {
  $scope.$on('$viewContentLoaded', function() {
    $scope.categories = mock_categories;
  });

  $scope.garbages = Garbage.query();

  $scope.changeCategory = function() {
    $scope.cleanSelectedCategories = new Array();
    for (var key in $scope.selectedCategories) {
      $scope.cleanSelectedCategories[key] = $scope.selectedCategories[key].name;
    }
  }

  $scope.goTo = function(garbageId) {
    $location.path('/garbage/'+garbageId);
  }

  $scope.testAjout = function() {
    // Sortie du script e-dechet.php
    for (var i in mock_dechets){
      Garbage.add(mock_dechets[i]);
    }
  }

}



function GarbageCtrl($scope, $location, $routeParams, Garbage, utils, geolocation) {
  Garbage.get({id: $routeParams.garbageId}, function(garbage) {
    self.original = garbage;
    $scope.garbage = new Garbage(self.original);
    $scope.garbage.name = utils.toTitleCase($scope.garbage.name);
  });
  // On remplit à l'arrache les lieux susceptibles d'accueillir ce déchet (sans doublons)
  $scope.locations = new Array();
  var random = new Array();
  for (var i=0 ; i<5 ; i++) {
    var test = Math.floor(Math.random() * 42);
    while ($.inArray(test, random) != -1){
      test = Math.floor(Math.random() * 42);
    }
    random[i] = test;
  }
  for (var i=0 ; i<5 ; i++) {
    $scope.locations[i] = mock_locations[random[i]];
  }
  for (i in $scope.locations) {
    $scope.locations[i].address = ($scope.locations[i].address == undefined || $scope.locations[i].address == '')? "Pas d'adresse enregistrée pour la "+$scope.locations[i].name : $scope.locations[i].address;
    $scope.locations[i].open = false;
  }

  // Pour l'accordéon
  $scope.oneAtATime = false;

  // $scope.tooltipMessageGeolocation = "Activer la géolocalisation";
  $scope.isGeolocated = {
    "val": false,
    "color": "danger",
    "message": "Activer la géolocalisation"
  };

  // Un point de la map arbitraire : la position de l'utilisateur
  // La valeur par défaut
  geolocation.setUserLocation({
      "latitude":44,
      "longitude": -0
    },
    function () {
      $scope.userLocation = geolocation.getUserLocation();
    }
  );

  // Des options pour l'init de la map
  $scope.mapOptions = {
    center: $scope.userLocation,
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };


  $scope.changeGeolocation = function () {
    if ($scope.isGeolocated.val) {
      // Si l'autoSet marche, on màj la position
      geolocation.autoSetUserLocation(function (error) {
        if (!error) {
          $scope.userLocation = geolocation.getUserLocation();
          $scope.myMarkers[$scope.myMarkers.length - 1].setMap(null);
          $scope.myMarkers[$scope.myMarkers.length - 1].setPosition($scope.userLocation);
          $scope.myMap.setCenter($scope.userLocation);
          $scope.isGeolocated.color = "success";
          $scope.isGeolocated.message = "Désactiver la géolocalisation";
        } else {
          $scope.isGeolocated.val = false;
          geolocation.setUserLocation({
              "latitude":44,
              "longitude": -0
            },
            function () {
              $scope.userLocation = geolocation.getUserLocation();
              $scope.myMarkers[$scope.myMarkers.length - 1].setMap(null);
              $scope.myMarkers[$scope.myMarkers.length - 1].setPosition($scope.userLocation);
              $scope.myMap.setCenter($scope.userLocation);
              $scope.isGeolocated.color = "danger";
              $scope.isGeolocated.message = "Activer la géolocalisation";
            }
          );
        }
      });
    } else {
      geolocation.setUserLocation({
          "latitude":44,
          "longitude": -0
        },
        function () {
          $scope.userLocation = geolocation.getUserLocation();
          $scope.myMarkers[$scope.myMarkers.length - 1].setMap(null);
          $scope.myMarkers[$scope.myMarkers.length - 1].setPosition($scope.userLocation);
          $scope.myMap.setCenter($scope.userLocation);
          $scope.isGeolocated.color = "danger";
          $scope.isGeolocated.message = "Activer la géolocalisation";
        }
      );
    }
  }

  //Markers should be added after map is loaded
  $scope.onMapIdle = function() {
    // On sette les markers sur la carte, et on init les infos windows
    $scope.myMarkers = new Array();
    $scope.myInfoWindows = new Array();
    for (i in $scope.locations) {
      $scope.myMarkers[i] = new google.maps.Marker({
        map: $scope.myMap,
        position: new google.maps.LatLng($scope.locations[i].latitude, $scope.locations[i].longitude)
      });
    }
    // Création du marker et de la window représentant la position de l'utilisateur
    $scope.myMarkers[$scope.locations.length] = new google.maps.Marker({
      map: $scope.myMap,
      position: $scope.userLocation,
      icon: new google.maps.MarkerImage('http://www.vacancesetloisirs.com/site/gmap/markers/blue.png'),
      tag: 'myPosition'
    });
    $scope.myInfoWindows[$scope.locations.length] = new google.maps.InfoWindow({
      content: "<h4>Ma position</h4>"
    });
  };

  $scope.markerClicked = function(index) {
    // Si ce n'est pas le marqueur de l'utilisateur qui a été cliqué
    if (index != $scope.locations.length) {
      $scope.locations[index].open = !$scope.locations[index].open;
      if ($scope.locations[index].open) {
        $scope.myInfoWindows[index].open($scope.myMap, $scope.myMarkers[index]);
      } else {
        $scope.myInfoWindows[index].close();
      }
    } else {
      $scope.myInfoWindows[index].open($scope.myMap, $scope.myMarkers[index]);
    }
  };

  $scope.accordionElementClicked = function() {
    for (i in $scope.locations) {
      if ($scope.locations[i].open) {
        $scope.myInfoWindows[i].open($scope.myMap, $scope.myMarkers[i]);
      } else {
        $scope.myInfoWindows[i].close();
      }
    }
  };

}
