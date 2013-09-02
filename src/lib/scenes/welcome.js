define(["classes/Scene",
    "layers/background", "layers/clouds", "layers/crosshair"
  ],
  function(Scene,
    background, clouds, crosshair) {
    
    var scene = new Scene({
      layers: [background, clouds, crosshair]
      //layers: [background]
    });

    return scene;
  }
);