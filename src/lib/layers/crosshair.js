define(["base/displayManager", "base/leapManager", "game/textures",
    "PIXI", "utils/publisher", "classes/Layer"
  ],
  function(displayManager, leapManager, textures,
    PIXI, publisher, Layer) {

    var layer = new Layer({
      listeners: {
        render: true,
        leap: true,
        interactionMove: true,
        interactionInitial: true
      }
    });

    var crosshairSprite;

    layer.onActivate = function() {

      crosshairSprite = new PIXI.Sprite(textures.atlas.crosshair);
      
      crosshairSprite.anchor = {
        x: 0.5,
        y: 0.5
      };

      crosshairSprite.scale = {
        x: 0.35,
        y: 0.35
      };

      crosshairSprite.alpha = 0.8;

      this.pixiLayer.addChild(crosshairSprite);

    };

    layer.onRender = function() {
      onRenderRotate();
    };

    layer.onInitial = layer.onMove = layer.onHandFrame = function(coordinates) {
      crosshairSprite.position = coordinates.position;
      crosshairSprite.scale.x = crosshairSprite.scale.y = 0.35 + coordinates.depth;
    };

    function onRenderRotate() {
      crosshairSprite.rotation += 0.08;
    }

    return layer;
  }
);