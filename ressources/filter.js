angular.module('utils', [])
.factory('utils', function(){
  return{
    compareStrArray: function(categoriesArray, queryArray){
      for (i in queryArray) {
	for (j in categoriesArray) {
	  if (queryArray[i] == categoriesArray[j]) {
	    console.log("test result : ");
	    console.log(queryArray[i]);
	    return true;
	  }
	}
      } 
      return false;
    }
  };
});

angular.module('filters',['utils'])
.filter('friendFilter', function(utils){

  return function(input, query){
    //query = $scope.search.categories;
    //query = ['3', '2'];
    query = ['laine', 'verre'];

    console.log('dans le filter');
    
    if(!query) return input;
    var result = [];

    angular.forEach(input, function(garbage){
      console.log('query');
      console.log(query);

      if(utils.compareStrArray(garbage.categories, query)) {
	result.push(garbage);
      }

    });
    return result;
  };
});
