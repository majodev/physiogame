module.exports = function(grunt) {
  grunt.initConfig({
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
    watch: {
      jsFiles: {
        files: ["src/lib/**/*.js", "src/spec/**/*.js"],
        tasks: ["shell:mocha-phantomjs"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-shell");

  grunt.registerTask("default", "shell:mocha-phantomjs");
  grunt.registerTask("build", "shell:build-requirejs");
};

// 1. make sure a http-server is running:
// (parameter -c-1 === cache for -1 seconds === dont cache)
// http-server -c-1

// 2. optional: run tests once:
// grunt shell:mocha-phantomjs --OR-- grunt

// 3. start watcher:
// grunt watch