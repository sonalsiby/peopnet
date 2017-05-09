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
            if (response.data=="OK") {
                $location.path('/my_profile');
            } else if (response.data=="NF") {
                $window.alert('Invalid login');
            }
        });
    }
    $scope.signupUser = function() {
        console.log('Pressed');
        $location.path('/');
    }
});

//User profile page Controller
angularApp.controller('myProfileController', function($scope, $http, $location, $window) {
    $scope.firstName = "Sonal";
    $scope.lastName = "Siby";
    //Logout
    $scope.logoutUser = function() {
        console.log('Came here');
        $location.path('/logout'); //Route is handled in express
        $window.location.reload();  //This is required. Don't know why.
    }
    
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