define(["log", "classes/Scene",
    "layers/gameObjects", "layers/background", "layers/clouds", "layers/crosshair",
    "layers/gameInfos", "layers/welcome", "layers/selection", "layers/goBack",
    "layers/debugInfo", "layers/credits", "layers/leapIndicator", "layers/nwSelection"
  ],
  function(log, Scene,
    gameObjects, background, clouds, crosshair,
    gameInfos, welcome, selection, goBack,
    debugInfo, credits, leapIndicator, nwSelection) {

    var scenes = [
      new Scene({
        id: "startscreen",
        layers: [background, clouds, debugInfo, welcome, selection, nwSelection,
          leapIndicator, crosshair
        ],
        backgroundMusic: "music/bg_main"
      }),
      new Scene({
        id: "shooting",
        layers: [background, clouds, debugInfo, gameObjects, gameInfos, goBack,
          leapIndicator, crosshair
        ],
        backgroundMusic: "music/bg_round"
      }),
      new Scene({
        id: "credits",
        layers: [background, clouds, debugInfo, credits, goBack,
          leapIndicator, crosshair
        ],
        backgroundMusic: "music/bg_credits"
      })
    ];

    function getScene(sceneID) {
      var i = 0,
        len = scenes.length;
      for (i; i < len; i += 1) {
        if (scenes[i].id === sceneID) {
          return scenes[i];
        }
      }

      throw new Error("MakeScene: scene with id=" + sceneID + " not found!");
    }

    return {
      getScene: getScene
    };
  }
);