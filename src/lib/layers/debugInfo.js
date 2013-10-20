define(["PIXI", "underscore", "classes/Layer", "base/displayManager",
    "base/leapManager", "gameConfig"
  ],
  function(PIXI, _, Layer, displayManager,
    leapManager, gameConfig) {

    var layer = new Layer(),
      debugDisplay,
      debugTextDisplayManager = "",
      debugTextLeapManager = "",
      debugTextGameSession = "gameSession: ";

    layer.onActivate = function() {
      if (gameConfig.get("debugLayerVisible") === true) {
        if (_.isUndefined(debugDisplay) === true) {

          debugDisplay = new PIXI.Text("Display @ 0 fps\nWarte auf Leap...", {
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
          x: 100,
          y: 32
        };

        displayManager.events.on("debugInfo", displayDebug);
        leapManager.events.on("debugInfo", leapDebug);

        this.addChild(debugDisplay);
      }
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