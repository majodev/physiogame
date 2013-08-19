// Configure RequireJS
require.config({
  baseUrl: "src/lib/",
  paths: {
    "PIXI": "../vendor/pixi/bin/pixi",
    "Leap": "../vendor/leapjs/leap",
    "key": "../vendor/keymaster/keymaster"
  },
  shim: {
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
  function (gameController) {
});