define(["displayController", "config", "leapController", "display/factory", "utils/eventPublisher"],
  function(displayController, config, leapController, factory, eventPublisher) {

    var events = eventPublisher(["crosshairActive"]),
      width = config.width,
      height = config.height,
      running = false,
      crosshair = factory.makeCrosshair(),
      layer = factory.makeLayer(),
      mouseCurrentlyDown = false;

    function init() {
      if (!running) {
        layer.addChild(crosshair);

        displayController.events.on("renderFrame", onRenderRotate);
        displayController.events.on("renderFrame", onRenderAlpha);
        leapController.events.on("handFrameNormalized", onHandFrame);

        crosshair.interactive = true;
        // this button mode will mean the hand cursor appears when you rollover the bunny with your mouse
        crosshair.buttonMode = true;

        running = true;
      }
    }

    function kill() {
      if (running) {
        layer.removeChild(crosshair);

        displayController.events.remove("renderFrame", onRenderRotate);
        displayController.events.remove("renderFrame", onRenderAlpha);
        leapController.events.remove("handFrameNormalized", onHandFrame);

        crosshair.interactive = false;
        // this button mode will mean the hand cursor appears when you rollover the bunny with your mouse
        crosshair.buttonMode = false;

        running = false;
      }
    }

    crosshair.mousemove = crosshair.touchmove = function(data) {
      var newPosition = data.getLocalPosition(this.parent);

      this.position.x = newPosition.x;
      this.position.y = newPosition.y;

      if (mouseCurrentlyDown === true) {
        events.fire("crosshairActive", {
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

    function onRenderRotate() {
      crosshair.rotation += 0.1;
    }

    function onRenderAlpha() {
      //console.log("check hands");
      if (leapController.getHandsAvailable() === true || mouseCurrentlyDown === true) {
        if (crosshair.alpha < 1) {
          crosshair.alpha += 0.02;
        }
      } else {
        if (crosshair.alpha > 0.2) {
          crosshair.alpha -= 0.01;
        }
      }
    }

    function onHandFrame(coordinates) {
      crosshair.position.x = coordinates.position.x;
      crosshair.position.y = coordinates.position.y;
    }

    return {
      activate: function() {
        init();
      },
      deactivate: function() {
        kill();
      },
      getRunning: function() {
        return running;
      },
      getLayer: function() {
        return layer;
      },
      events: events,
      mouseCurrentlyDown: mouseCurrentlyDown
    };
  }
);