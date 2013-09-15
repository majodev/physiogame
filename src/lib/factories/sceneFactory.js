define(["log", "classes/Scene",
    "layers/aliens", "layers/background", "layers/clouds", "layers/crosshair",
    "layers/score", "layers/welcome", "layers/selection"
  ],
  function(log, Scene,
    aliens, background, clouds, crosshair,
    score, welcome, selection) {

    var scenes = [
      new Scene({
        id: "startscreen",
        layers: [background, clouds, welcome, selection]
      }),
      new Scene({
        id: "shooting",
        layers: [background, clouds, aliens, crosshair, score]
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