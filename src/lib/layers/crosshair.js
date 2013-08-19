define(["display", "leapInput", "displayFactory"],
  function(display, leapInput, displayFactory) {

    var width = display.renderer.width,
      height = display.renderer.height,
      running = false,
      crosshair = displayFactory.makeBunny();

    var rotateAnimation = function rotateAnimation() {
      crosshair.rotation += 0.1;
    };

    var alphaAnimation = function alphaAnimation() {
      //console.log("check hands");
      if (leapInput.getHandsAvailable() === true) {
        if(crosshair.alpha < 1) {
          crosshair.alpha += 0.1;
        }
      } else {
        if(crosshair.alpha > 0.2) {
          crosshair.alpha -= 0.01;
        }
      }
    };

    var init = function init() {
      if (!running) {
        display.stage.addChild(crosshair);
        
        display.registerAnimation(rotateAnimation);
        display.registerAnimation(alphaAnimation);

        running = true;
      }
    };

    var kill = function kill() {
      if (running) {
        display.stage.removeChild(crosshair);

        display.unregisterAnimation(rotateAnimation);
        display.unregisterAnimation(alphaAnimation);

        running = false;
      }
    };

    leapInput.getLeap().on("frame", function(frame) {
      if (running) {
        crosshair.position.x = width / 2 + (leapInput.getX() * 2.5);
        crosshair.position.y = (height / 3) * 4 - (leapInput.getY() * 2);
      }
    });

    return {
      show: function() {
        init();
      },
      hide: function() {
        kill();
      }
    };
  }
);