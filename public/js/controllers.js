'use strict';

angular.module('remembrallApp.controllers', ['remembrallApp.services'])
  .controller('VisualizationController', ['$scope', '$window', 'Points',
      function($scope, $window, Points) {
    Points.getFriends().$promise.then(function(response) {
      angular.forEach(response, function(item) {
        if (item.timeStamp) { 
          item.dateTimeStamp = new Date(item.timeStamp); 
        }
      });
      $scope.data = response;
    });
  }]);
