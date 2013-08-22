define(["displayController", "config", "leapController", "display/factory"],
  function(displayController, config, leapController, factory) {

    var width = config.width,
      height = config.height,
      running = false,
      crosshair = factory.makeCrosshair(),
      layer = factory.makeLayer();

    function init() {
      if (!running) {
        layer.addChild(crosshair);

        displayController.events.on("renderFrame", onRenderRotate);
        displayController.events.on("renderFrame", onRenderAlpha);
        leapController.events.on("handFrameNormalized", onHandFrame);

        running = true;
      }
    }

    function kill() {
      if (running) {
        layer.removeChild(crosshair);

        displayController.events.remove("renderFrame", onRenderRotate);
        displayController.events.remove("renderFrame", onRenderAlpha);
        leapController.events.remove("handFrameNormalized", onHandFrame);

        running = false;
      }
    }

    function onRenderRotate() {
      crosshair.rotation += 0.1;
    }

    function onRenderAlpha() {
      //console.log("check hands");
      if (leapController.getHandsAvailable() === true) {
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
      getLayer: function() {
        return layer;
      },
      getRunning: function() {
        return running;
      }
    };
  }
);