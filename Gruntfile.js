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
      inigma: {
        src: [ 'src/js/**/*.js' ],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        preserveComments: 'some'
      },
      core: {
        src: '<%= concat.inigma.dest %>',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },
    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: false,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        src: ['src/less/bootstrap.less', 'src/less/addons/inigma.less'],
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
        csslintrc: 'src/less/.csslintrc'
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
        config: 'src/less/.csscomb.json'
      },
      dist: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/'
      }
    },

    copy: {
      fonts: {
        src: 'fonts/*',
        dest: 'dist/'
      }
    },
    watch: {
      src: {
        files: 'src/js/**/*.js',
        tasks: ['concat']
      },
      less: {
        files: 'src/less/**/*.less',
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
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify:core']);

  // CSS distribution task.
  grunt.registerTask('less-compile', ['less:compileCore']);
  grunt.registerTask('dist-css', ['less-compile', 'autoprefixer:core', 'csscomb:dist', 'cssmin:minifyCore']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean:dist', 'dist-css', 'copy:fonts', 'dist-js']);

  // Default task.
  grunt.registerTask('default', ['clean:dist', 'dist']);
};