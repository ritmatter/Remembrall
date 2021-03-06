'use strict';

module.exports = function(grunt) {
  var browsers = ['Chrome'];
  var plugins = ['karma-jasmine', 'karma-chrome-launcher'];
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      // define the files to lint
      files: ['Gruntfile.js', 'public/js/**/*.js', 'app/**/*.js',
        'server.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // more options here if you want to override JSHint defaults
        node: true,
        globals: {
          angular: false,
          module: false,
          console: false
        }
      }
    },
    watch: {
      express: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'express:dev'],
        options: {
          spawn: false
        }
      }
    },
    express: {
      dev: {
        options: {
          port: 8080,
          script: 'server.js'
        }
      }
    },
    karma: {
      options: {
        browsers: browsers,
        files: [
          'public/libs/angular/angular.js', 'public/libs/angular-mocks/angular-mocks.js',
          'public/libs/angular-resource/angular-resource.js',
          'public/libs/angular-route/angular-route.js',
          'public/js/*.js', 'public/test/*.js'
        ],
        frameworks: ['jasmine'],
        plugins: plugins,
        autoWatch: false,
        singleRun: true
      },
      unit: {
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mocha-test');

  // the default task can be run just by typing "grunt" on the command line
  grunt.registerTask('default', ['express:dev', 'karma:unit:start', 'mochaTest', 'jshint', 'watch']);
  grunt.registerTask('test', ['karma:unit:start']);
};
