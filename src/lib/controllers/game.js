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

      scene.showScene("welcome");
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
      toggleScene();
    });

    function toggleScene() {

      if(scene.getCurrentSceneIdentifier() === "shooter") {
        scene.showScene("welcome");
      } else {
        scene.showScene("shooter");
      }
      console.log("toggleScene, currentScene: " + scene.getCurrentSceneIdentifier());
    }

    function logDebugText(debugText) {
      console.log(debugText);
    }

    // public
    return {
      init: init
    };
  }
);