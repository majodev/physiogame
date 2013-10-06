define(["log", "classes/Scene",
    "layers/gameObjects", "layers/background", "layers/clouds", "layers/crosshair",
    "layers/score", "layers/welcome", "layers/selection", "layers/goBack",
    "layers/debugInfo", "layers/credits", "layers/leapIndicator"
  ],
  function(log, Scene,
    gameObjects, background, clouds, crosshair,
    score, welcome, selection, goBack,
    debugInfo, credits, leapIndicator) {

    var scenes = [
      new Scene({
        id: "startscreen",
        layers: [background, clouds, debugInfo, welcome, selection]
      }),
      new Scene({
        id: "shooting",
        layers: [background, clouds, debugInfo, gameObjects, crosshair, score,
          leapIndicator, goBack
        ]
      }),
      new Scene({
        id: "credits",
        layers: [background, clouds, debugInfo, credits, goBack]
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