'use strict';

angular.module('remembrallApp.controllers', [])
  .controller('VisualizationController', function($scope, $window) {
    $scope.data = [
      {"timeStamp": new Date("07/22/2014"), "data": 5},
      {"timeStamp": new Date("07/23/2014"), "data": 3},
      {"timeStamp": new Date("07/24/2014"), "data": 0}
    ]
  });
