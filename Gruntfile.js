module.exports = function(grunt) {
  grunt.initConfig({
    shell: {
      'mocha-phantomjs': { // also possible, only display dots for test cases: mocha-phantomjs -R dothttp://localhost:8080/testrunner.html
        command: 'mocha-phantomjs http://localhost:8080/testrunner.html',
        options: {
          stdout: true,
          stderr: true
        }
      }
    },
    watch: {
      jsFiles: {
        files: ['src/lib/**/*.js', 'src/spec/**/*.js'],
        tasks: ['shell:mocha-phantomjs']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
};

// 1. make sure a http-server is running:
// (parameter -c-1 === cache for -1 seconds === don't cache)
// http-server -c-1

// 2. optional: run tests once:
// grunt shell:mocha-phantomjs

// 3. start watcher:
// grunt watch