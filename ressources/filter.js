angular.module('utils', [])
.factory('utils', function(){
  return{
    compareStrArray: function(categoriesArray, queryArray){
      var compte = 0;
      for (i in queryArray) {
        for (j in categoriesArray) {
          if (queryArray[i] == categoriesArray[j]) {
            compte ++;
          }
        }
      } 
      return (compte == queryArray.length);
    }
  };
});

angular.module('filters',['utils'])
.filter('categoryFilter', function(utils){

  return function(input, queryArray){

    if(!queryArray || queryArray == '') return input;
    var result = [];

    angular.forEach(input, function(garbage){
      if(utils.compareStrArray(garbage.categories, queryArray)) {
         result.push(garbage);
      }

    });
    return result;
  };
});
