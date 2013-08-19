// Configure RequireJS
require.config({
  baseUrl: "src/lib/",
  paths: {
    "PIXI": "../vendor/pixi/bin/pixi",
    "Leap": "../vendor/leapjs/leap"
  },
  shim: {
    "PIXI": {
      exports: "PIXI"
    },
    "Leap": {
      exports: "Leap"
    }
  }
});

// Start the main app logic.
require(["gameLogic"],
  function (gameLogic) {
});