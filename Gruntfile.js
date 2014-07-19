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
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // the default task can be run just by typing "grunt" on the command line
  grunt.registerTask('default', ['jshint']);
};
