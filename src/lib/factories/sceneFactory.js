define(["log", "classes/GameScenePixi",
    "layers/aliens", "layers/background", "layers/clouds", "layers/crosshair",
    "layers/score", "layers/welcome", "layers/testLayer"
  ],
  function(log, GameScenePixi,
    aliens, background, clouds, crosshair,
    score, welcome, testLayer) {

    function makeScene(sceneID) {

      var scene;

      switch (sceneID) {

        case "startscreen":
          scene = new GameScenePixi({
            layers: [background, clouds, welcome, crosshair, testLayer]
          });
          break;

        case "shooting":
          scene = new GameScenePixi({
            layers: [background, clouds, aliens, crosshair, score]
          });
          break;

        default:
          scene = new GameScenePixi({
            layers: [background]
          });
          log.warn("sceneID (" + sceneID + ") not found, returning default scene");
      }

      return scene;

    }

    return {
      makeScene: makeScene
    };
  }
);