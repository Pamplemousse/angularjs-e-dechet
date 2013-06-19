angular.module('utils', [])
.factory('utils', function(){
  return{
    compareStrArray: function (categoriesArray, queryArray) {
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