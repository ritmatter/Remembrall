'use strict';

module.exports = function(grunt) {
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
    }
  });


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express-server');

  // the default task can be run just by typing "grunt" on the command line
  grunt.registerTask('default', ['express:dev', 'watch']);
};
