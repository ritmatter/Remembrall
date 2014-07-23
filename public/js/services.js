'use strict';

// RESTful service that will eventually interface with an ~RESTful EAN backend
angular.module('remembrallApp.services', ['ngResource'])
  .service('Points', ['$resource', function($resource) {
    return $resource('/api/points/', {}, {
      getFriends: {
        method: 'GET',

       // Request returns an array
        isArray: true,

       // Serialize to JSON from and to backend
        transformRequest: function(data, headersGetter) {
          headersGetter()['Content-Type'] = 'application/json';
          return JSON.stringify(data);
        },
        transformResponse: function(data) {
          return JSON.parse(data);
        }
      }
    });
  }]);
