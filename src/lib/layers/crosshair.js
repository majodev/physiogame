define(["base/displayManager", "base/leapManager", "display/factory",
  "PIXI", "utils/publisher"],
  function(displayManager, leapManager, factory, PIXI, publisher) {

    var events = publisher.make(),
      running = false,
      crosshair = factory.makeCrosshair(),
      layer = factory.makeLayer(),
      mouseCurrentlyDown = false;

    function activate() {
      if (!running) {
        layer.addChild(crosshair);

        crosshair.scale.x = crosshair.scale.y = 0.5;

        displayManager.events.on("renderFrame", onRenderRotate);
        displayManager.events.on("renderFrame", onRenderAlpha);
        leapManager.events.on("handFrameNormalized", onHandFrame);

        crosshair.interactive = true;
        // this button mode will mean the hand cursor appears when you rollover the bunny with your mouse
        crosshair.buttonMode = true;

        running = true;
      }
    }

    function deactivate() {
      if (running) {
        layer.removeChild(crosshair);

        displayManager.events.off("renderFrame", onRenderRotate);
        displayManager.events.off("renderFrame", onRenderAlpha);
        leapManager.events.off("handFrameNormalized", onHandFrame);

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

    function onRenderRotate() {
      crosshair.rotation += 0.1;
    }

    function onRenderAlpha() {
      if (leapManager.getHandsAvailable() === true || mouseCurrentlyDown === true) {
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
      activate: activate,
      deactivate: deactivate,
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