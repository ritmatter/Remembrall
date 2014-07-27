'use strict';

angular.module('remembrallApp', [
  'ngRoute',
  'remembrallApp.directives',
  'remembrallApp.controllers',
  'remembrallApp.services',
  'remembrallApp.libFactories',
  'remembrallApp.d3Directives'
]).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/visualization',
          { templateUrl: 'templates/main.html', controller: 'VisualizationController' })
    .otherwise({redirectTo: '/visualization' });
  $locationProvider.html5Mode(true);
}]);
