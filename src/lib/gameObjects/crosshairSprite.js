define(["display/factory", "utils/publisher"],
  function(factory, publisher) {

    var crosshairSprite = factory.makeCrosshair(),
      mouseCurrentlyDown = false,
      events = publisher.make();

    crosshairSprite.interactive = true;
    crosshairSprite.buttonMode = true;
    crosshairSprite.scale.x = crosshairSprite.scale.y = 0.5;

    crosshairSprite.mousemove = crosshairSprite.touchmove = function(data) {
      var newPosition = data.getLocalPosition(this.parent);

      this.position.x = newPosition.x;
      this.position.y = newPosition.y;

      if (mouseCurrentlyDown === true) {
        events.trigger("crosshairActive", {
          position: this.position
        });
      }
    };

    crosshairSprite.mousedown = crosshairSprite.touchstart = function(data) {
      // stop the default event...
      data.originalEvent.preventDefault();
      mouseCurrentlyDown = true;
    };

    // set the events for when the mouse is released or a touch is released
    crosshairSprite.mouseup = crosshairSprite.mouseupoutside = crosshairSprite.touchend = crosshairSprite.touchendoutside = function(data) {
      mouseCurrentlyDown = false;
    };

    return {
      crosshairSprite: crosshairSprite,
      mouseCurrentlyDown: mouseCurrentlyDown,
      events: events
    };
  }
);