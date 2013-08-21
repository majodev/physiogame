// Configure RequireJS
require.config({
  baseUrl: "src/",
  paths: {
    "chai": "../node_modules/chai/chai",
    "mocha": "../node_modules/mocha/mocha"
  },
  urlArgs: "v=" + (new Date()).getTime()
});

// Require libraries
require(["require", "chai", "mocha"],
  function(require, chai) {

    // Chai
    assert = chai.assert;
    should = chai.should();
    expect = chai.expect;

    // Mocha
    mocha.setup("bdd");

    // Require tests before starting
    require(["spec/utils/eventPublisher", "spec/utils/mixin"],
      function(eventPublisher, mixin) {
        // Start runner
        mocha.run();
      }
    );

  });