'use strict';

angular.module('project', ['filters','mongolab','ui.select2','ui.map','ui.event','ui.bootstrap']).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:ListCtrl, templateUrl:'app/partials/list.html'}).
      when('/garbage/:garbageId', {controller:GarbageCtrl, templateUrl:'app/partials/garbage.html'}).
      otherwise({redirectTo:'/'});
  });


