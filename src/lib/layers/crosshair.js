define(["base/displayManager", "base/leapManager", "display/factory",
  "PIXI", "utils/publisher", "classes/Layer", "gameObjects/crosshairSprite"],
  function(displayManager, leapManager, factory, PIXI, publisher,
    Layer, crosshairSprite) {

    var layer = new Layer({
      listeners: {
        render: true,
        leap: true
      }
    });

    layer.onActivate = function () {
      this.pixiLayer.addChild(crosshairSprite.crosshairSprite);
    };

    layer.onRender = function () {
      onRenderRotate();
      onRenderAlpha();
    };

    layer.onHandFrame = function (coordinates) {
      crosshairSprite.crosshairSprite.position.x = coordinates.position.x;
      crosshairSprite.crosshairSprite.position.y = coordinates.position.y;
    };

    function onRenderRotate() {
      crosshairSprite.crosshairSprite.rotation += 0.1;
    }

    function onRenderAlpha() {
      if (leapManager.getHandsAvailable() === true || crosshairSprite.mouseCurrentlyDown === true) {
        if (crosshairSprite.crosshairSprite.alpha < 1) {
          crosshairSprite.crosshairSprite.alpha += 0.02;
        }
      } else {
        if (crosshairSprite.crosshairSprite.alpha > 0.2) {
          crosshairSprite.crosshairSprite.alpha -= 0.01;
        }
      }
    }
    
    return layer;
  }
);