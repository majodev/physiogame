define(["display/factory", "utils/publisher"],
  function(factory, publisher) {

    var display = factory.makeCrosshair(),
      events = publisher.make();

    display.interactive = true;
    display.buttonMode = false;
    display.scale.x = display.scale.y = 0.5;

    display.mousemove = display.touchmove = function(data) {
      var newPosition = data.getLocalPosition(this.parent);

      this.position.x = newPosition.x;
      this.position.y = newPosition.y;

      if (display.buttonMode === true) {
        events.trigger("crosshairActive", {
          position: this.position
        });
      }
    };

    display.mousedown = display.touchstart = function(data) {
      // stop the default event...
      data.originalEvent.preventDefault();
      display.buttonMode = true;
    };

    // set the events for when the mouse is released or a touch is released
    display.mouseup = display.mouseupoutside = display.touchend = display.touchendoutside = function(data) {
      display.buttonMode = false;
    };

    return {
      display: display,
      events: events
    };
  }
);