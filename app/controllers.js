function ListCtrl($scope, $location, Garbage) {
  $scope.$on('$viewContentLoaded', function() {
    $("#e2").select2({
      placeholder: "Select a State",
      allowClear: true
    });
    $("#e2_2").select2({
      placeholder: "Select a State"
    });
  });

  $scope.garbages = Garbage.query();

  $scope.goTo = function(garbageId) {
      $location.path('/garbage/'+garbageId);
  }

  $scope.testAjout = function() {
   // Sortie du script e-dechet.php 
    for (var i in mock_dechets){
      Garbage.add(dechets[i]);
    }
  }
}

function GarbageCtrl($scope, $location, $routeParams, Garbage) {
  Garbage.get({id: $routeParams.garbageId}, function(garbage) {
    self.original = garbage;
    $scope.garbage = new Garbage(self.original);
  });
}