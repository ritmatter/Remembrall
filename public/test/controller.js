describe('MainController', function() {
  var scope,
  controller;
  beforeEach(angular.mock.module('remembrallApp'));
  it('should have a VisualizationController', function() {
    expect(remembrallApp.controllers.VisualizationController).toBeDefined();
  });
});
