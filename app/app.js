'use strict';

angular.module('project', ['filters','mongolab']).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:ListCtrl, templateUrl:'app/partials/list.html'}).
      when('/garbage/:garbageId', {controller:GarbageCtrl, templateUrl:'app/partials/garbage.html'}).
      otherwise({redirectTo:'/'});
  });
