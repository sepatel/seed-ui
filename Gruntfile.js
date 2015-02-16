module.exports = function(grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function(string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  var fs = require('fs');
  var path = require('path');

  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration.
    clean: {
      dist: 'dist',
      docs: 'docs/dist'
    },

    concat: {
      sliqsolv: {
        src: [ 'client/js/**/*.js' ],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        preserveComments: 'some'
      },
      vendor: {
        src: [
          'bower_components/jquery/dist/jquery.js', 'bower_components/angular/angular.js',
          'bower_components/angular-animate/angular-animate.js', 'bower_components/angular-route/angular-route.js',
          'bower_components/ui-utils/ui-utils.js', 'js/ui-bootstrap-tpls-0.12.0.js'
        ],
        dest: 'dist/js/vendor.min.js'
      }
    },
    less: {
      compileCore: {
        options: {
          strictMath: true
        },
        src: ['client/less/bootstrap.less', 'client/less/addons/sliqsolv.less'],
        dest: 'dist/css/<%= pkg.name %>.css'
      }
    },

    autoprefixer: {
      core: {
        options: {
          map: false
        },
        src: 'dist/css/<%= pkg.name %>.css'
      }
    },

    csslint: {
      options: {
        csslintrc: 'client/less/.csslintrc'
      },
      dist: 'dist/css/<%= pkg.name %>.css'
    },

    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '*',
        noAdvanced: true
      },
      minifyCore: {
        src: 'dist/css/<%= pkg.name %>.css',
        dest: 'dist/css/<%= pkg.name %>.min.css'
      }
    },

    csscomb: {
      options: {
        config: 'client/less/.csscomb.json'
      },
      dist: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/'
      }
    },

    copy: {
      css: { src: 'css/*', dest: 'dist/' },
      js: { /* src: 'js/*', dest: 'dist/' */ },
      html: { expand: true, cwd: 'client/', src: '**/*.html', dest: 'dist/' },
      fonts: { /* src: 'fonts/*', dest: 'dist/' */ }
    },

    watch: {
      src: {
        files: 'client/js/**/*.js',
        tasks: ['concat']
      },
      html: { files: 'client/**/*.html', tasks: 'copy:html' },
      less: {
        files: 'client/less/**/*.less',
        tasks: 'less'
      }
    },

    sed: {
      versionNumber: {
        pattern: (function() {
          var old = grunt.option('oldver');
          return old ? RegExp.quote(old) : old;
        })(),
        replacement: grunt.option('newver'),
        recursive: true
      }
    },
    exec: {
      npmUpdate: {
        command: 'npm update'
      }
    }
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  // CSS distribution task.
  grunt.registerTask('less-compile', ['less:compileCore']);
  grunt.registerTask('dist-css', ['less-compile', 'autoprefixer:core', 'csscomb:dist', 'cssmin:minifyCore']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean:dist', 'copy', 'dist-css', 'dist-js']);

  // Default task.
  grunt.registerTask('default', ['clean:dist', 'dist']);
};
