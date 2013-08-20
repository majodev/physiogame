define(["displayController", "displayConfig", "leapController", "displayFactory"],
  function(displayController, displayConfig, leapController, displayFactory) {

    var width = displayConfig.width,
      height = displayConfig.height,
      running = false,
      crosshair = displayFactory.makeBunny(),
      layer = displayFactory.makeLayer();

    function init() {
      if (!running) {
        layer.addChild(crosshair);

        displayController.events.on("renderFrame", onRenderRotate);
        displayController.events.on("renderFrame", onRenderAlpha);
        leapController.events.on("handFrame", onHandFrame);

        running = true;
      }
    }

    function kill() {
      if (running) {
        layer.removeChild(crosshair);

        displayController.events.remove("renderFrame", onRenderRotate);
        displayController.events.remove("renderFrame", onRenderAlpha);
        leapController.events.remove("handFrame", onHandFrame);

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
      crosshair.position.x = width / 2 + (coordinates.x * 2.5);
      crosshair.position.y = (height / 3) * 4 - (coordinates.y * 2);
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