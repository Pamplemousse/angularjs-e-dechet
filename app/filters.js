'use strict';

angular.module('filters', ['utils'])
  .filter('categoryFilter', function(){

    return function(input, query){


      if(!query) return input;
      var result = [];

      angular.forEach(input, function(friend){
        if(utils.compareStr(friend.name, query) ||
           utils.compareStr(friend.phone, query))
          result.push(friend);          
      });


      return result;
    };
  });