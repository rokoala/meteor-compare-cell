;(function () {
'use strict';

var app = angular.module('meteor-compare-cell',['angular-meteor','ui.router']);


app.config(["$urlRouterProvider", "$stateProvider", "$locationProvider",function($urlRouterProvider, $stateProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'client/home.ng.html',
      controller: 'HomeCellController'
    })
    .state('configuration', {
      url: '/configuration',
      templateUrl: 'client/configuration.ng.html',
      controller: 'ConfigurationController'
    });

  $urlRouterProvider.otherwise("/");
}]);

app.controller('HomeCellController', ['$scope','$meteor',function ($scope,$meteor) {

    $scope.comparative = [];

    $scope.phones = $meteor.collection(Phones,true);

    $scope.favoriteFilterOn = false;

    $scope.toogleFavoriteFilter = function () {
      $scope.favoriteFilterOn = ($scope.favoriteFilterOn) ? false: true;
    };

    $scope.phoneFilters = function (item) {
      if($scope.favoriteFilterOn){
        if(item.favorite)
          return item;
      }else
        return item;
    };

    $scope.toogleLike = function(phone) {
      phone.favorite = (phone.favorite) ? false : true;
    };

    $scope.addToCompare = function (phone) {
      if($scope.comparative.length < 2)
        $scope.comparative.push(phone);
    };

    $scope.removeComparative = function (index) {
      $scope.comparative.splice(index,1);
    };

}]);

app.controller('FavoritesCellController', ['$scope',function ($scope) {
  $scope.favorites = $scope.$meteorCollection(Phones, false).subscribe("favorites");
}]);

app.controller('ConfigurationController', ['$scope','$meteor','$stateParams',function ($scope,$meteor,$stateParams) {

    $scope.phones = $meteor.collection(Phones,false);

    $scope.phone = $meteor.object(Phones, $stateParams.partyId, false);

    $scope.addPhone = function () {
       $scope.phone.save().then(function () {
         $scope.phone = $meteor.object(Phones, $stateParams.partyId, false);
       });
    };

    $scope.remove = function(phone){
      if(confirm("Deseja remover o celular "+phone.name+" ?"))
        $scope.phones.remove(phone);
    };
}]);

})();
