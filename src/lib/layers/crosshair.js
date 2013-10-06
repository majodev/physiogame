define(["base/displayManager", "base/leapManager",
  "PIXI", "utils/publisher", "classes/Layer", "game/crosshairGO"],
  function(displayManager, leapManager, PIXI, publisher,
    Layer, crosshairGO) {

    var layer = new Layer({
      listeners: {
        render: true,
        leap: true
      }
    });

    layer.onActivate = function () {
      this.pixiLayer.addChild(crosshairGO.display);
    };

    layer.onRender = function () {
      onRenderRotate();
      onRenderAlpha();
    };

    layer.onHandFrame = function (coordinates) {
      crosshairGO.display.position.x = coordinates.position.x;
      crosshairGO.display.position.y = coordinates.position.y;
    };

    function onRenderRotate() {
      crosshairGO.display.rotation += 0.1;
    }

    function onRenderAlpha() {
      if (leapManager.getHandsAvailable() === true || crosshairGO.display.buttonMode === true) {
        if (crosshairGO.display.alpha < 1) {
          crosshairGO.display.alpha += 0.02;
        }
      } else {
        if (crosshairGO.display.alpha > 0.2) {
          crosshairGO.display.alpha -= 0.01;
        }
      }
    }
    
    return layer;
  }
);