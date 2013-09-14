define(["classes/GameLayerPixi"],
  function(GameLayerPixi) {
    var layer = new GameLayerPixi();

    layer.activate = function() {
      var entity = this.addChildGe({
        c: {
          texture: {
            image: "assets/crosshair.png"
          },
          speed: {
            x: 4,
            y: 2,
            rotation: 0.1
          },
          target: {
            x: 300,
            y: 500
          }
        },
        systems: ["moveToTarget", "rotateWithSpeed", "pixiSpriteRenderer"],
        binding: {
          moveToTargetXReached: ["randomTargetX"],
          moveToTargetYReached: ["randomTargetY"]
        }
      });

      // entity.events.on("rotateWithSpeedRound", function (entity, systemid) {
      //   console.log("rotate reset: " + entity.c.rotation);
      // })
    };

    return layer;
  }
);