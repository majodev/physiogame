define(["controllers/display", "controllers/leap", "controllers/scene", "key",
  "controllers/sound"
  ],
  function(display, leap, scene, key,
    sound) {

    // private
    var showDebug = false;

    function init() {
      console.log("gameController: init");

      display.init();
      sound.init();
      scene.init();
      leap.init();

      scene.events.on("showScene", sceneChanged);
      scene.showMainScene();
    }

    function sceneChanged(scene) {
      display.resize();
    }

    function toggleDebugInfo() {
      if (showDebug === true) {
        display.events.off("debugInfo", logDebugText);
        leap.events.off("debugInfo", logDebugText);
        console.log("hiding debug info");
        showDebug = false;

      } else {
        display.events.on("debugInfo", logDebugText);
        leap.events.on("debugInfo", logDebugText);
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
    return {
      init: init
    };
  }
);