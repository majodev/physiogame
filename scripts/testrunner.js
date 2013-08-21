// Configure RequireJS
require.config({
  baseUrl: "src/",
  urlArgs: "v=" + (new Date()).getTime()
});

// Require libraries
require(["spec/utils/eventPublisher", "spec/utils/mixin"],
  function(eventPublisher, mixin) {

    console.log("testing...");

    // Start runner
    if (window.mochaPhantomJS) {
      mochaPhantomJS.run();
    } else {
      mocha.run();
    }
  }
);