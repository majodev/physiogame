define(["systems/InputSystem", "components/object2d",
    "components/sub/bounds2d", "components/speed2d",
    "components/sprite2d",
    "underscore", "utils/hittest"
  ],
  function(InputSystem, object2d, bounds2d, speed2d, sprite2d, _, hittest) {

    var system = new InputSystem({
      id: "resetRightToLeft",
      needs: [object2d, sprite2d, speed2d, bounds2d]
    });

    system.updateEntity = function(entity) {

      entity.display.mousemove = entity.display.touchmove = function (data) {

      }

      entity.display.mousedown = entity.display.touchstart = function (data) {
        
      }

    };


    crosshair.mousemove = crosshair.touchmove = function(data) {
      var newPosition = data.getLocalPosition(this.parent);

      this.position.x = newPosition.x;
      this.position.y = newPosition.y;

      if (mouseCurrentlyDown === true) {
        events.trigger("crosshairActive", {
          position: this.position
        });
      }
    };

    crosshair.mousedown = crosshair.touchstart = function(data) {
      // stop the default event...
      data.originalEvent.preventDefault();
      mouseCurrentlyDown = true;
    };

    // set the events for when the mouse is released or a touch is released
    crosshair.mouseup = crosshair.mouseupoutside = crosshair.touchend = crosshair.touchendoutside = function(data) {
      mouseCurrentlyDown = false;
    };

    return system;
  });