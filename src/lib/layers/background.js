define(["config", "classes/GameLayerPixi"
  ],
  function(config, GameLayerPixi) {

    var layer = new GameLayerPixi();

    layer.activate = function() {
      this.addChildGe({
        c: {
          flags: {
             autoDetectDimensions: false
          },
          texture: {
            id: "bg/0000"
          },
          width: config.get("width"),
          height: config.get("height"),
          position: {
            x: 0,
            y: 0
          },
          anchor: {
            x: 0,
            y: 0
          }
        },
        systems: ["pixiSpriteRenderer"]
      });
    };

    return layer;
  }
);