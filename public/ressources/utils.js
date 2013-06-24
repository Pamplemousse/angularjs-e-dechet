angular.module('utils', [])
.factory('utils', function() {
  return {
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
    },
    toTitleCase: function (str) {
        // return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    }
  };
});