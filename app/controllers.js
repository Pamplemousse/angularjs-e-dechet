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
}



function MapCtrl($scope) {
  var ll = new google.maps.LatLng(13.0810, 80.2740);
  $scope.mapOptions = {
    center: ll,
    zoom: 15,
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
