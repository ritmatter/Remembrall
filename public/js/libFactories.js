'use strict';

angular.module('remembrallApp.libFactories', [])
  .service('d3Service', ['$document', '$q', '$rootScope', '$window',
    function($document, $q, $rootScope, $window) {
      var d = $q.defer();
      function onScriptLoad() { 
        // Load client in the browser
        $rootScope.$apply(function() { d.resolve($window.d3); });
      }
      var scriptTag = $document[0].createElement('script');
      scriptTag.type = 'text/javascript'; 
      scriptTag.async = true;
      scriptTag.src = 'libs/d3/d3.js';
      scriptTag.onreadystatechange = function () {
        if (this.readyState == 'complete') onScriptLoad();
      };
      scriptTag.onload = onScriptLoad;

      var s = $document[0].getElementsByTagName('body')[0];
      s.appendChild(scriptTag);

      return {
        d3: function() { return d.promise; }
      };
    }])
    
    .factory('_', function () {
      return window._;
    });

