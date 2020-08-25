// Gruntfile with the configuration of grunt-express and grunt-open. No livereload yet!
module.exports = function(grunt) {
 
  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 
  // Configure Grunt 
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),
 
    // grunt-express will serve the files from the folders listed in `bases`
    // on specified `port` and `hostname`
    express: {
      all: {
        options: {
          port: 9000,
          hostname: "0.0.0.0",
          bases: ['src'], // Replace with the directory you want the files served from
                              // Make sure you don't use `.` or `..` in the path as Express
                              // is likely to return 403 Forbidden responses if you do
                              // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
          livereload: true
        }
      }
    },
    sass: {
      dist: {
        files: {
          'src/css/main.css': 'src/css/scss/main.scss',
        }
      }
    },
    // configure watch to auto update ----------------
    watch: {
      tasks: ['sass'],
      files: ['src//*.html','src/css/scss/*.scss', 'src/js/*.js'], 
      options: {
          livereload: true
        }
    },

    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    },
  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS! ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');

    // Creates the `server` task
  grunt.registerTask('default', [
    'express',
    'sass',
    'open',
    'watch',
  ]);
  
};
