define(["displayController", "leapController", "sceneController", "key"],
  function(displayController, leapController, sceneController, key) {

    // private
    var showDebug = false;

    console.log("lodash: " + _.VERSION);

    // immediately invoked, inits gameController and child controllers
    (function init() {

      console.log("gameController: init");

      displayController.init();
      sceneController.init();
      leapController.init();

      sceneController.showMainScene();
    }());

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