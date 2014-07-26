'use strict';

angular.module('remembrallApp', [
  'ngRoute',
  'remembrallApp.directives',
  'remembrallApp.controllers',
  'remembrallApp.services',
  'remembrallApp.d3Directives',
  'remembrallApp.d3Services'
]).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/visualization',
          { templateUrl: 'templates/main.html', controller: 'VisualizationController' })
    .otherwise({redirectTo: '/visualization' });
  $locationProvider.html5Mode(true);
}]);
