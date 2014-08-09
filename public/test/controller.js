describe('Initialize Controller', function() {
  var scope, controller, mockPointsService = {};
  beforeEach(function () {
    angular.mock.module('remembrallApp');
    inject(function($rootScope, $controller, $q, _$timeout_) {
      mockPoints =  {
        getFriends: function () {}
      }
      spyOn(mockPoints, 'getFriends').andCallFake(function () {
        deferred = $q.defer();
        return {$promise: deferred.promise}
      });
      $scope = $rootScope.$new();
      $rootScope.$apply();
      $timeout = _$timeout_;
      ctrl = $controller('VisualizationController', {
        $scope: $scope,
        Points: mockPoints
      });
    });
  }); 
  describe('VisualizationController specification', function () {
    beforeEach(function () {
      deferred.resolve([{"timeStamp": 100}]);
      $scope.$apply();
        
    })
    it('should format the service data\'s date', inject(function($controller, $rootScope) {
      expect(mockPoints.getFriends).toHaveBeenCalled();
      expect($scope.data).toEqual(
        [{"timeStamp": 100, "dateTimeStamp": new Date(100)}]
      );
    }));
  });
});
