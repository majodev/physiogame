define(["classes/Scene",
    "layers/background", "layers/clouds", "layers/crosshair", "layers/welcome"
  ],
  function(Scene,
    background, clouds, crosshair, welcome) {
    
    var scene = new Scene({
      layers: [background, clouds, welcome, crosshair]
    });

    return scene;
  }
);