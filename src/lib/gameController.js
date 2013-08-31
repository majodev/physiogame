define(["displayController", "leapController", "sceneController", "key",
    "display/assets", "soundController"
  ],
  function(displayController, leapController, sceneController, key,
    assets, soundController) {

    // private
    var showDebug = false;

    // immediately invoked, inits gameController and child controllers
    (function preloading() {

      if (assets.assetsLoaded === true) {
        init();
      } else {
        assets.events.on("assetsLoaded", init);
      }
    }());

    function init() {
      console.log("gameController: init");

      assets.events.off("assetsLoaded", init);

      displayController.init();
      sceneController.init();
      leapController.init();

      sceneController.events.on("showScene", sceneChanged);
      sceneController.showMainScene();
    }

    function sceneChanged(scene) {
      displayController.resize();
    }

    function toggleDebugInfo() {
      if (showDebug === true) {
        displayController.events.off("debugInfo", logDebugText);
        leapController.events.off("debugInfo", logDebugText);
        console.log("hiding debug info");
        showDebug = false;

      } else {
        displayController.events.on("debugInfo", logDebugText);
        leapController.events.on("debugInfo", logDebugText);
        console.log("showing debug info");
        showDebug = true;
      }
    }

    key('enter', function() {
      toggleDebugInfo();
    });

    function logDebugText(debugText) {
      console.log(debugText);
    }

    // public
    return {};
  }
);