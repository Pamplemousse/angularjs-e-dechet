function ListCtrl($scope, $location, Garbage) {
  $scope.$on('$viewContentLoaded', function() {

    $scope.friends = {
      john: {
	name: 'John',
  phone: ["1","2","3"]
      },
  mary: {
    name: 'Mary',
  phone: ["1","2","3"]
  },
  mike: {
    name: 'Mike',
  phone: ["2","3"]
  },
  adam: {
    name: 'Adam',
  phone: ["1","2","3"]
  },
  julie: {
    name: 'Julie',
  phone: ["1"]
  }
    };

    $scope.search = {};

    $scope.categories = mock_categories;
    $scope.numbers = ["1","2","3"];
    $("#e9").select2();



    $("#e9").on("change", function(e) {          
      // $("#e9").select2("val")
      var selectedCategories = $("#e9").select2("val");
      $scope.searchCategories = new Array();

      for (key in selectedCategories) {
	$scope.searchCategories.push(mock_categories[selectedCategories[key]].name);
      }

      console.log('array');
      console.log($scope.searchCategories);

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
