// Configure RequireJS
require.config({
  baseUrl: "src/lib/",
  paths: {
    "underscore": "../../node_modules/lodash/lodash",
    "Backbone": "../../node_modules/backbone/backbone",
    "PIXI": "../vendor/pixi/bin/pixi.dev",
    "Leap": "../vendor/leapjs/leap",
    "key": "../vendor/keymaster/keymaster"
  },
  shim: {
    "Backbone": {
      deps: ["underscore"],
      exports: "Backbone"
    },
    "PIXI": {
      exports: "PIXI"
    },
    "Leap": {
      exports: "Leap"
    },
    "key": {
      exports: "key"
    }
  }
});

// Start the main app logic.
require(["gameController"],
  function(gameController) {});