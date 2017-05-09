/*
Peopnet AngularJS Script
*/

var angularApp = angular.module('Peopnet', ['ngRoute']);

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//Angular controllers definitions
//Login Controller
angularApp.controller('loginController', function($scope, $http) {
    //
});

//User profile Controller
angularApp.controller('myProfileController', function($scope, $http) {
    $scope.firstName = "Sonal";
    $scope.lastName = "Siby";
});

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//Frontend routing happens here in Angular
//Backend routes are handles by express in server.js
angularApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: '/my_profile.html',
        controller: 'myProfileController'
    });
    $locationProvider.html5Mode(true);
});