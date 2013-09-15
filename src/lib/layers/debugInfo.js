define(["PIXI", "underscore", "classes/Layer", "base/displayManager", "base/leapManager"],
  function(PIXI, _, Layer, displayManager, leapManager) {

    var layer = new Layer(),
      debugDisplay,
      debugTextDisplayManager = "display: received 0 frames @ 0fps",
      debugTextLeapManager = "leap: received 0 frames @ 0fps";

    layer.onActivate = function() {
      if (_.isUndefined(debugDisplay) === true) {

        debugDisplay = new PIXI.Text("observing fps...", {
          font: "bold 15px Arvo",
          fill: "#3344bb",
          align: "left",
          stroke: "#AAAAFF",
          strokeThickness: 1,
          wordWrap: false,
          wordWrapWidth: 100
        });

      }

      debugDisplay.position = {
        x: 15,
        y: 15
      };

      displayManager.events.on("debugInfo", displayDebug);
      leapManager.events.on("debugInfo", leapDebug);

      this.addChild(debugDisplay);
    };

    function displayDebug(text) {
      debugTextDisplayManager = text;
      updateDebugText();
    }

    function leapDebug(text) {
      debugTextLeapManager = text;
      updateDebugText();
    }

    function updateDebugText() {
      debugDisplay.setText(debugTextDisplayManager + "\n" + debugTextLeapManager);
    }

    layer.onDeactivate = function() {
      displayManager.events.off("debugInfo", displayDebug);
      leapManager.events.off("debugInfo", leapDebug);
    };

    return layer;

  }
);