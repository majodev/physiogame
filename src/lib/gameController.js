define(["displayController", "leapController", "sceneController", "key",
    "display/assets", "soundController", "loaders/preloader"
  ],
  function(displayController, leapController, sceneController, key,
    assets, soundController, preloader) {

    // private
    var showDebug = false;

    // gameController starts preloading and inits itself after finished
    (function preloading() {

      preloader.events.on("preloadedAll", init);
      preloader.init();

    }());

    function init() {
      console.log("gameController: init");

      assets.init();
      displayController.init();
      soundController.init();
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