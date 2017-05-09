/** 
 *Peopnet AngularJS Script
**/

var angularApp = angular.module('Peopnet', ['ngRoute']);

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//Angular controllers definitions
//Login Controller
angularApp.controller('loginController', function($scope, $http, $window, $location) {
    $scope.username = '';
    $scope.password = '';
    $scope.loginUser = function() {
        var userData = {
            username: $scope.username,
            password: $scope.password
        };
        $scope.username = ''; //Clear form
        $scope.password = '';
        $http.post('/userAuth', userData) //POST to this URL. Express handles authentication and responds
        .then(function(response) {
            console.log(response);
            if (response.data=="OK") {
                $location.path('/my_profile');
            } else if (response.data=="NF") {
                $window.alert('Invalid login');
            }
        });
    }
});

//User profile page Controller
angularApp.controller('myProfileController', function($scope, $http) {
    $scope.firstName = "Sonal";
    $scope.lastName = "Siby";
});

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//Frontend routing happens here in Angular
//Backend routes are handles by express in server.js
angularApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: '/login.html',
        controller: 'loginController'
    });
    $routeProvider.when('/my_profile', {
        templateUrl: '/my_profile.html',
        controller: 'myProfileController'
    });
    $locationProvider.html5Mode(true);
});