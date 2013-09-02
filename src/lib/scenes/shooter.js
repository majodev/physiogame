define(["classes/Scene", "layers/crosshair", "layers/aliens", "display/factory",
  "layers/score", "layers/background", "layers/clouds"
  ],
  function(Scene, crosshair, aliens, factory,
    score, background, clouds) {

    var scene = new Scene({
      layers: [background, clouds, aliens, crosshair, score]
    });

    return scene;
  }
);