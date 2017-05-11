/** 
 * Peopnet AngularJS Script
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
        $location.path('/register');
    }
});

//User profile page Controller
angularApp.controller('myProfileController', function($scope, $http, $location) {
    $scope.firstName = "Sonal";
    $scope.lastName = "Siby";
    //Logout
    $scope.logoutUser = function() {
        $http.get('/logout').
        then(function (response) {
            console.log(response);
            $location.path('/');
        });
    }
});

//Register page Controller
angularApp.controller('registerController', function($scope, $http, $location, $window) {
    $scope.username = '';
    $scope.password = '';
    $scope.rptPassword = '';
    $scope.user_icon = "glyphicon-remove";
    $scope.pass_icon = "glyphicon-remove";
    $scope.user_color = "label-danger";
    $scope.pass_color = "label-danger";
    $scope.userStatus = 'Minimum of 5 chars';
    $scope.passStatus = 'Minimum of 8 chars';
    $scope.userOK = false;
    $scope.passOK = false;

    $scope.userChange = function() {
        data = {
            username: $scope.username
        }
        $http.post('/checkUser', data).
        then(function (response) {
            $scope.userOK = false;
            if ($scope.username==undefined || $scope.username.length<5) {
                $scope.user_color = "label-danger";
                $scope.userStatus = 'Minimum of 5 chars';
            } else if (response.data=="T") {
                $scope.user_color = "label-success";
                $scope.userStatus = 'This username is available';
                $scope.userOK = true;
            } else {
                $scope.user_color = "label-danger";
                $scope.userStatus = 'Username not available';
            }
        });
    }
    $scope.passChange = function() {
        $scope.passOK = false;
        if ($scope.password==undefined || $scope.password.length<=8) {
            $scope.pass_color = "label-danger";
            $scope.passStatus = 'Minimum of 8 chars';
        
        } else if ($scope.password==$scope.rptPassword) {
            $scope.pass_color = "label-success";
            $scope.passStatus = 'Password match. Awesome!';
            $scope.passOK = true;
        } else {
            $scope.pass_color = "label-danger";
            $scope.passStatus = 'The passwords do not match';
        }
    }
    $scope.cancelRegn = function() {
        $location.path('/');
    }
    $scope.registerUser = function() {
        data = {
            username: $scope.username,
            password: $scope.password,
        }
        $http.post('/registerUser', data)
        .then(function(response) {
            window.alert("Registration successful. Please log in");
            $location.path('/');
        });
    }
});

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//Frontend routing happens here in Angular
//Backend routes are handled by express in server.js
angularApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: '/login.html',
        controller: 'loginController'
    });
    $routeProvider.when('/my_profile', {
        templateUrl: '/my_profile.html',
        controller: 'myProfileController'
    });
    $routeProvider.when('/register', {
        templateUrl: '/register.html',
        controller: 'registerController'
    });
    $locationProvider.html5Mode(true);
});