define(["scenes/mainScene", "displayController", "leapController", "key"],
  function(mainScene, displayController, leapController, key, Leap) {

    // private
    var showDebug = false;
    displayController.stage.addChild(mainScene.getScene());

    function toggleDebugInfo() {
      if (showDebug === true) {
        displayController.events.remove("debugInfo", logDebugText);
        leapController.events.remove("debugInfo", logDebugText);

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