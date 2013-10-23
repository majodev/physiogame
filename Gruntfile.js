module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      "mocha-phantomjs": { // also possible, only display dots for test cases: mocha-phantomjs -R dothttp://localhost:8080/testrunner.html
        command: "mocha-phantomjs http://localhost:8080/testrunner.html", // http-server must run on port 8080!
        options: {
          stdout: true,
          stderr: true
        }
      },
      "build-requirejs": {
        command: "node scripts/build.js",
        options: {
          stdout: true,
          stderr: true
        }
      },
      "build-almond": {
        command: "node scripts/build-almond.js",
        options: {
          stdout: true,
          stderr: true
        }
      }
    },
    copy: {
      "assets": {
        files: [{
          src: ["assets/**/*.json", "assets/**/*.png", "assets/**/*.mp3", "assets/**/*.ogg", "assets/**/*.m4a", "!assets/sounds/old/**/*.*", "!assets/sprites/old/**/*.*", "!assets/old/**/*.*"],
          dest: "build/"
        }]
      },
      "build-templates": {
        files: [{
          expand: true,
          cwd: "build-templates/",
          src: ["**/*.json", "**/*.html"],
          dest: "build/"
        }]
      },
      "legal": {
        files: [{
          expand: true,
          cwd: ".",
          src: ["LICENSE.md"],
          dest: "build/"
        }]
      }
    },
    uglify: {
      my_target: {
        files: {
          'build/app.min.js': ['src/hooks/modernizer_custom.js', 'build-templates/app.js']
        }
      }
    },
    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd HH:MM:s") %> */'
      },
      css: {
        src: ["src/vendor/bootstrap/dist/css/bootstrap.css", "src/vendor/bootstrap-slider/css/slider.css", "app.css"],
        dest: "build/app.min.css"
      }
    },
    watch: {
      jsFiles: {
        files: ["src/lib/**/*.js", "src/spec/**/*.js"],
        tasks: ["shell:mocha-phantomjs"]
      }
    },
    modernizr: {

      // [REQUIRED] Path to the build you're using for development.
      "devFile": "src/hooks/modernizr/modernizr_dev_v2_6_2.js",

      // [REQUIRED] Path to save out the built file.
      "outputFile": "src/hooks/modernizer_custom.js",

      // Based on default settings on http://modernizr.com/download/
      "extra": {
        "shiv": true,
        "printshiv": false,
        "load": true,
        "mq": false,
        "cssclasses": true
      },

      // Based on default settings on http://modernizr.com/download/
      "extensibility": {
        "addtest": false,
        "prefixed": false,
        "teststyles": false,
        "testprops": false,
        "testallprops": false,
        "hasevents": false,
        "prefixes": false,
        "domprefixes": false
      },

      // By default, source is uglified before saving
      "uglify": true,

      // Define any tests you want to implicitly include.
      "tests": [],

      // By default, this task will crawl your project for references to Modernizr tests.
      // Set to false to disable.
      "parseFiles": true,

      // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
      // You can override this by defining a "files" array below.
      "files": ["app.js", "src/lib/**/*.js"],

      // When parseFiles = true, matchCommunityTests = true will attempt to
      // match user-contributed tests.
      "matchCommunityTests": false,

      // Have custom Modernizr tests? Add paths to their location here.
      "customTests": []
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-shell");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-modernizr");
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask("default", "shell:mocha-phantomjs");
  grunt.registerTask("build", ["modernizr", "shell:build-almond", "uglify" ,"copy:build-templates", "copy:assets", "cssmin", "copy:legal"]);
};



// HOW TO TEST

// 1. make sure a http-server is running:
// (parameter -c-1 === cache for -1 seconds === dont cache)
// http-server -c-1

// 2. optional: run tests once:
// grunt shell:mocha-phantomjs

// 3. start test watcher:
// grunt watch