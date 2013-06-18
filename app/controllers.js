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

    $scope.oneAtATime = false;





  });
}
