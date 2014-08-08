describe('MainController', function() {
  var scope, controller, mockPointsService = {};
  beforeEach(angular.mock.module('remembrallApp.controllers'));
  it('should have a VisualizationController', inject(function($controller) {
    var VisualizationController = $controller('VisualizationController', { $scope: {} });
    expect(VisualizationController).toBeDefined();
  }));
});
