define(["base/displayManager", "base/leapManager", "game/textures",
    "PIXI", "utils/publisher", "classes/Layer", "gameConfig"
  ],
  function(displayManager, leapManager, textures,
    PIXI, publisher, Layer, gameConfig) {

    var layer = new Layer({
      listeners: {
        render: true,
        leap: true,
        interactionMove: true,
        interactionInitial: true,
        interactionClick: true
      }
    });

    var crosshairSprite,
      crosshairTexture,
      rotateCrosshair;

    layer.onActivate = function() {
      
      crosshairTexture = textures.atlas[gameConfig.get("crosshairTexture")];
      rotateCrosshair = gameConfig.checkKeyIsEnabled("crosshairTextureRotate") && gameConfig.get("crosshairTextureRotate");

      crosshairSprite = new PIXI.Sprite(crosshairTexture);
      
      crosshairSprite.anchor = {
        x: 0.5,
        y: 0.5
      };

      crosshairSprite.scale = {
        x: 0.35,
        y: 0.35
      };

      crosshairSprite.alpha = 0.8;
      
      crosshairSprite.visible = false;
      this.pixiLayer.addChild(crosshairSprite);

    };

    layer.onRender = function() {
      onRenderRotate();
    };

    layer.onClick = layer.onInitial = layer.onMove = layer.onHandFrame = function(coordinates) {
      crosshairSprite.visible = true;
      crosshairSprite.position = coordinates.position;
      crosshairSprite.scale.x = crosshairSprite.scale.y = 0.35 + coordinates.depth;
    };



    function onRenderRotate() {
      if(rotateCrosshair === true) {
        crosshairSprite.rotation += 0.08;
      }
    }

    return layer;
  }
);