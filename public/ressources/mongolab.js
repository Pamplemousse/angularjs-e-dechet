angular.module('mongolab', ['ngResource']).
    factory('Garbage', function($resource) {
      var Garbage = $resource('https://api.mongolab.com/api/1/databases/angularjs/collections/garbages/:id',
                      { apiKey: 'xum_xn6Xn7QcL4K03_H9fj-Ks0H4lH3T' }, { add: {method: 'POST'}, update: {method: 'PUT'} }
                    );
      return Garbage;
    }).
    factory('Category', function($resource) {
      var Category = $resource('https://api.mongolab.com/api/1/databases/angularjs/collections/categories/:id',
                      { apiKey: 'xum_xn6Xn7QcL4K03_H9fj-Ks0H4lH3T' }, { add: {method: 'POST'}, update: {method: 'PUT'} }
                    );
      return Category;
    }).
    factory('Room', function($resource) {
      var Room = $resource('https://api.mongolab.com/api/1/databases/angularjs/collections/rooms/:id',
                      { apiKey: 'xum_xn6Xn7QcL4K03_H9fj-Ks0H4lH3T' }, { add: {method: 'POST'}, update: {method: 'PUT'} }
                    );
      return Room;
    });
