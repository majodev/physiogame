// Configure RequireJS
require.config({
  baseUrl: "src/",
  paths: {
    "underscore": "../node_modules/lodash/lodash", // watch out: registers _ itself (noConflict!)
  },
  urlArgs: "v=" + (new Date()).getTime()
});

// Require libraries
require(["spec/utils/hittest"],
  function() {

    console.log("testing...");

    // Start runner, conditional is needed here for phantomjs!
    if (window.mochaPhantomJS) {
      mochaPhantomJS.run();
    } else {
      mocha.run();
    }
  }
);