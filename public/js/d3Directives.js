'use strict';

/* This is an example directive. Doesn't really do anything. However, this presents a good
opportunity to set a precedent for how we document our directives, like so:

<div sm-add-item ... ng-model="<array to add to>" ></div>
Adds an item to <array to add to> where this array is specified in the ng-model attribute of the
div smAddItem rests on. smAddItem must be attached to a div as it will not init its own elements.
*/
angular.module('remembrallApp.d3Directives', [])
  .directive('streakChart', function () {
    return {
      restrict: 'A',
      template: 'templates/main.html',
      controller: 'VisualizationController',
      //Going to add this when we actually have a data model to pass to this.
      // For now we are going to monkeypatch our streak
      // require: '^streak'
      scope: {
        ngModel: '='
      }
      link: function(scope, ele, attrs) {

      }
    };
  });
