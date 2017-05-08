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

//Main Controller
angularApp.controller('mainController', function($scope, $http) {
    //
});

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//Frontend routing happens here in Angular
//Backend routes are handles by express in server.js
angularApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: '/views/login.html',
        controller: 'loginController'
    })
    $locationProvider.html5Mode(true);
});