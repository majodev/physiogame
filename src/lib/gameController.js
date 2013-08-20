define(["scenes/mainScene", "displayController", "leapController", "key"],
  function(mainScene, displayController, leapController, key) {

    // private
    var showDebug = false;
    displayController.stage.addChild(mainScene.getScene());

    function toggleDebugInfo() {
      if (showDebug === true) {
        displayController.events.remove("debugInfo", showDebugText);
        leapController.events.remove("debugInfo", showDebugText);

        console.log("hiding debug info");
        showDebug = false;

      } else {
        displayController.events.on("debugInfo", showDebugText);
        leapController.events.on("debugInfo", showDebugText);

        console.log("showing debug info");
        showDebug = true;
      }
    }

    key('enter', function() {
      toggleDebugInfo();
    });

    var showDebugText = function showDebugText(debugText) {
      console.log(debugText);
    };

    // public
    return {};
  }
);