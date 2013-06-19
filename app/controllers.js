function ListCtrl($scope, $location, Garbage) {
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



function GarbageCtrl($scope, $location, $routeParams, Garbage) {
  Garbage.get({id: $routeParams.garbageId}, function(garbage) {
    self.original = garbage;
    $scope.garbage = new Garbage(self.original);
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
    $scope.locations[i].address = ($scope.locations[i].address == undefined || $scope.locations[i].address == '')? "Pas d'adresse enregistrée pour la : "+$scope.locations[i].name : $scope.locations[i].address;
  }

  // Pour l'accordéon
  $scope.oneAtATime = false;


  // Un point de la map arbitraire : la position de l'utilisateur
  var ll = new google.maps.LatLng(44.966389, -0.883056);
  $scope.mapOptions = {
    center: ll,
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  //Markers should be added after map is loaded
  $scope.onMapIdle = function() {
    if ($scope.myMarkers === undefined){    
      var marker = new google.maps.Marker({
      	map: $scope.myMap,
      	position: ll
      });
      $scope.myMarkers = [marker, ];
    }
  };

  $scope.markerClicked = function(m) {
    window.alert("clicked");
  };

}
