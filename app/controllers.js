function ListCtrl($scope, $location, Garbage) {
  $scope.$on('$viewContentLoaded', function() {
    
    $scope.search = {};

    $scope.categories = mock_categories;
    $("#e9").select2();



    $("#e9").on("change", function(e) {          
        // $("#e9").select2("val")
        var selectedCategories = $("#e9").select2("val");
        $scope.search.categories = new Array();

        for (key in selectedCategories) {
          $scope.search.categories.push(mock_categories[selectedCategories[key]]);
        }

        console.log($scope.search.categories);

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