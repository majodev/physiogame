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
      }
    },
    copy: {
      "assets": {
        files: [{
          src: ["assets/**/*.json", "assets/**/*.png", "assets/**/*.mp3", "assets/**/*.ogg", "assets/**/*.m4a"],
          dest: "build/"
        }]
      }
    },
    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd HH:MM:s") %> */'
      },
      css: {
        src: "app.css",
        dest: "build/app.min.css"
      }
    },
    watch: {
      jsFiles: {
        files: ["src/lib/**/*.js", "src/spec/**/*.js"],
        tasks: ["shell:mocha-phantomjs"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-shell");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-concat");

  grunt.registerTask("default", "shell:mocha-phantomjs");
  grunt.registerTask("build", ["shell:build-requirejs", "copy:assets", "cssmin"]);
};

// 1. make sure a http-server is running:
// (parameter -c-1 === cache for -1 seconds === dont cache)
// http-server -c-1

// 2. optional: run tests once:
// grunt shell:mocha-phantomjs --OR-- grunt

// 3. start watcher:
// grunt watch