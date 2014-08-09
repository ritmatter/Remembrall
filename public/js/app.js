'use strict';


var remembrallApp = angular.module('remembrallApp', [
  'ngRoute',
  'ngResource',
]).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/visualization',
          { templateUrl: 'templates/main.html', controller: 'VisualizationController' })
    .otherwise({redirectTo: '/visualization' });
  $locationProvider.html5Mode(true);
}]);
