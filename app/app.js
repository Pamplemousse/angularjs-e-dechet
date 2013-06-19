'use strict';

angular.module('project', ['filters','mongolab','ui.select2','ui.map','ui.event']).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:ListCtrl, templateUrl:'app/partials/list.html'}).
      when('/map', {controller:MapCtrl, templateUrl:'app/partials/map.html'}).
      when('/garbage/:garbageId', {controller:GarbageCtrl, templateUrl:'app/partials/garbage.html'}).
      otherwise({redirectTo:'/'});
  });


