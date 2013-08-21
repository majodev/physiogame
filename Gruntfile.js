module.exports = function(grunt) {
  grunt.initConfig({
    shell: {
      'mocha-phantomjs': {
        command: 'mocha-phantomjs -R dot http://localhost:8080/testrunner.html',
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

// run tests once:
// grunt shell:mocha-phantomjs

// start watcher:
// grunt watch