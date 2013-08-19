define(["displayController", "leapController", "displayFactory"],
  function(displayController, leapController, displayFactory) {

    var width = displayController.renderer.width,
      height = displayController.renderer.height,
      running = false,
      crosshair = displayFactory.makeBunny(),
      layer = displayFactory.makeLayer();

    var rotateAnimation = function rotateAnimation() {
      crosshair.rotation += 0.1;
    };

    var alphaAnimation = function alphaAnimation() {
      //console.log("check hands");
      if (leapController.getHandsAvailable() === true) {
        if (crosshair.alpha < 1) {
          crosshair.alpha += 0.1;
        }
      } else {
        if (crosshair.alpha > 0.2) {
          crosshair.alpha -= 0.01;
        }
      }
    };

    var init = function init() {
      if (!running) {
        layer.addChild(crosshair);

        displayController.registerAnimation(rotateAnimation);
        displayController.registerAnimation(alphaAnimation);

        running = true;
      }
    };

    var kill = function kill() {
      if (running) {
        layer.removeChild(crosshair);

        displayController.unregisterAnimation(rotateAnimation);
        displayController.unregisterAnimation(alphaAnimation);

        running = false;
      }
    };

    leapController.getLeap().on("frame", function(frame) {
      if (running) {
        crosshair.position.x = width / 2 + (leapController.getX() * 2.5);
        crosshair.position.y = (height / 3) * 4 - (leapController.getY() * 2);
      }
    });

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