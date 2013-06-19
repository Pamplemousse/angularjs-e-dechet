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
