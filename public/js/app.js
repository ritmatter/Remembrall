angular.module('remembrallApp', [
  'ngRoute',
  'remembrallApp.directives',
  'remembrallApp.controllers',
  'remembrallApp.services'
]).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/visualization',
          {templateUrl: 'views/main.html', controller: 'VisualizationController' })
    .otherwise({redirectTo: '/visualization' });
  $locationProvider.html5Mode(true);
}]);
