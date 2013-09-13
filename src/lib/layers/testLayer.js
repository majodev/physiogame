define(["classes/GameLayerPixi"],
  function(GameLayerPixi) {
    var layer = new GameLayerPixi();

    layer.activate = function() {
      this.addChildGe({
        c: {
          texture: {
            image: "assets/crosshair.png"
          },
          speed: {
            x: 4,
            y: 2
          },
          target: {
            x: 300,
            y: 500
          }
        },
        systems: ["moveToTarget", "randomTarget", "pixiSpriteRenderer"]
      });
    };

    return layer;
  }
);