'use strict';

angular.module('project', ['mongolab']).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:ListCtrl, templateUrl:'app/partials/list.html'}).
      when('/garbage/:garbageId', {controller:GarbageCtrl, templateUrl:'app/partials/garbage.html'}).
      otherwise({redirectTo:'/'});
  });






  // $scope.garbages = [
  //   {name:'pull en laine', category:{0:'paper', 1:'plastic', 2:'metal'}, room:'kitchen', description:'La description du dechet concerne etc...'},
  //   {name:'commode', category:'paper', room:'kitchen', description:'La description du dechet concerne etc...'},
  //   {name:'batterie de telephone', category:['paper'], room:'kitchen', description:'La description du dechet concerne etc...'},
  //   {name: 'assiette', category:'paper', room:'kitchen', description:'La description du dechet concerne etc...'},
  //   {name: 'verre a boire', category:'metal', room:'kitchen', description:'La description du dechet concerne etc...'},
  //   {name: 'canette de soda', category:'paper', room:'kitchen', description:'La description du dechet concerne etc...'},
  //   {name: 'sac plastique', category:'plastic', room:'kitchen', description:'La description du dechet concerne etc...'},
  //   {name: 'cafetiere', category:'plastic', room:'kitchen', description:'La description du dechet concerne etc...'},
  //   {name: 'magazine', category:'paper', room:'kitchen', description:'La description du dechet concerne etc...'},
  //   {name: 'pot de peinture', category:'metal', room:'kitchen', description:'La description du dechet concerne etc...'},
  //   {name: 'roue de velo', category:'plastic', room:'kitchen', description:'La description du dechet concerne etc...'},
  //   {name: 'bouteille de soda', category:'plastic', room:'kitchen', description:'La description du dechet concerne etc...'},
  //   {name: 'bouteille de lait ', category:'plastic', room:'kitchen', description:'La description du dechet concerne etc...'},
  //   {name: 'brique de lait', category:'metal', room:'kitchen', description:'La description du dechet concerne etc...'},
  //   {name: 'pot de yaourt', category:'paper', room:'kitchen', description:'La description du dechet concerne etc...'},
  //   {name: 'bouteille de shampoing', category:'metal', room:'kitchen', description:'La description du dechet concerne etc...'},
  //   {name: 'rasoir jetable', category:'plastic', room:'kitchen', description:'La description du dechet concerne etc...'},
  //   {name: 'bombe deodorant', category:'metal', room:'kitchen', description:'La description du dechet concerne etc...'},
  //   {name: 'deodorant en stick', category:'metal', room:'kitchen', description:'La description du dechet concerne etc...'},
  //   {name: 'barquette polystyrene', category:'plastic', room:'kitchen', description:'La description du dechet concerne etc...'},
  //   {name: 'capsule de cafe', category:'metal', room:'kitchen', description:'La description du dechet concerne etc...'}
  // ];