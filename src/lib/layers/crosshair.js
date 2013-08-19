define(["display", "input", "objectFactory"],
  function (display, input, objectFactory) {

  var width = display.renderer.width,
    height = display.renderer.height,
    running = false,
    crosshair = objectFactory.makeBunny(400, 300);

  var init = function init() {
    if(!running) {
      display.stage.addChild(crosshair);
    }
    running = true;
  };

  var kill = function kill() {
    if(running) {
      display.stage.removeChild(crosshair);
    }
    running = false;
  };

  input.getLeap().on("frame", function(frame) {
    if(running) {
      crosshair.position.x = width/2 + (input.getX()*2.5);
      crosshair.position.y = (height/3)*4 - (input.getY()*2);
    }
  });

  return {
    show: function () {
      init();
    },
    hide: function () {
      kill();
    }
  };
});