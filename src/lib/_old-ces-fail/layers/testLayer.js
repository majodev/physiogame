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

      this.pixiLayer.mousemove = this.pixiLayer.touchmove = function (data) {
        console.log("touchmove");
      };

      this.pixiLayer.mousedown = this.pixiLayer.touchstart = function (data) {
        console.log("touchstart");
      };

      this.pixiLayer.click = function (data) {
        console.log("click");
      };

      // entity.display.mousemove = entity.display.touchmove = function(data) {
      //   var newPosition = data.getLocalPosition(this.parent);

      //   this.position.x = newPosition.x;
      //   this.position.y = newPosition.y;

      //   // if (mouseCurrentlyDown === true) {
      //   //   events.trigger("crosshairActive", {
      //   //     position: this.position
      //   //   });
      //   // }
        
      //   console.log("mousemove");
      // };

      // entity.display.mousedown = entity.display.touchstart = function(data) {
      //   // stop the default event...
      //   data.originalEvent.preventDefault();
      //   //mouseCurrentlyDown = true;
      //   //
      //   console.log("mousedown");
      // };

      // entity.events.on("rotateWithSpeedRound", function (entity, systemid) {
      //   console.log("rotate reset: " + entity.c.rotation);
      // })
    };

    return layer;
  }
);