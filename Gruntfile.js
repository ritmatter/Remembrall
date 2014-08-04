'use strict';

module.exports = function(grunt) {
  var browsers = ['Chrome'];
  var plugins = ['karma-jasmine', 'karma-chrome-launcher'];
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      // define the files to lint
      files: ['Gruntfile.js', 'public/js/**/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        globalstrict: true,
        // more options here if you want to override JSHint defaults
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
          'public/js/**/*.js', 'public/test/**/*.js' 
        ],
        frameworks: ['jasmine'],
        plugins: plugins,
        autoWatch: false,
        singleRun: true
      },
      unit: {
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-karma');

  // the default task can be run just by typing "grunt" on the command line
  grunt.registerTask('default', ['express:dev', 'karma:unit:start', 'watch']);
  grunt.registerTask('test', ['karma:unit:start']);
};
