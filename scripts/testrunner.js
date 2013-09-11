// Configure RequireJS
require.config({
  baseUrl: "src/lib/",
  mainConfigFile: "scripts/main.js", // include all dependencies from main
  paths: {
    "spec": "../spec",
    "integration": "../integration",
    "underscore": "../../node_modules/lodash/lodash", // watch out: registers _ itself (noConflict!)
  },
  urlArgs: "v=" + (new Date()).getTime()
});

// Require libraries target spec and integration subpackages directly.
require(["spec/specTests", "integration/integrationTests"],
  function() {
    console.log("running tests...");

    // Start runner, conditional is needed here for phantomjs!
    if (window.mochaPhantomJS) {
      mochaPhantomJS.run();
    } else {
      mocha.run();
    }
  }
);