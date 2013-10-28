define(["base/displayManager", "base/leapManager", "game/textures",
    "PIXI", "utils/publisher", "classes/Layer", "gameConfig", "layers/gameObjects"
  ],
  function(displayManager, leapManager, textures,
    PIXI, publisher, Layer, gameConfig, gameObjects) {

    var layer = new Layer({
      listeners: {
        render: true,
        leap: true,
        interactionMove: true,
        interactionInitial: true,
        interactionClick: true
      }
    });

    var crosshairHolder,
      crosshairSprite,
      crosshairSpriteDisabled,
      crosshairTexture,
      crosshairDisabledTexture,
      rotateCrosshair;

    layer.onActivate = function() {

      crosshairTexture = textures.atlas[gameConfig.get("crosshairTexture")];
      crosshairDisabledTexture = textures.atlas[gameConfig.get("crosshairTexture") + "Disabled"];

      // param from options if rotate is enabled...
      rotateCrosshair = gameConfig.checkKeyIsEnabled("crosshairTextureRotate") && gameConfig.get("crosshairTextureRotate");


      // HOLDER
      crosshairHolder = new PIXI.DisplayObjectContainer();

      crosshairHolder.anchor = {
        x: 0.5,
        y: 0.5
      };

      crosshairHolder.scale = {
        x: 0.35,
        y: 0.35
      };

      crosshairHolder.alpha = 0.8;

      crosshairHolder.visible = false;

      // SPRITE...
      crosshairSprite = new PIXI.Sprite(crosshairTexture);
      crosshairSprite.anchor = {
        x: 0.5,
        y: 0.5
      };
      crosshairHolder.active = crosshairSprite;

      crosshairSpriteDisabled = new PIXI.Sprite(crosshairDisabledTexture);
      crosshairSpriteDisabled.anchor = {
        x: 0.5,
        y: 0.5
      };
      crosshairHolder.inactive = crosshairSpriteDisabled;


      crosshairHolder.addChild(crosshairSpriteDisabled);
      crosshairHolder.addChild(crosshairSprite);

      crosshairHolder.inactive.visible = false;
      this.pixiLayer.addChild(crosshairHolder);


      gameObjects.events.on("crosshairStatus", setStatus);
    };

    layer.onDeactivate = function() {
      gameObjects.events.off("crosshairStatus", setStatus);
    };

    function setStatus(active) {
      crosshairHolder.inactive.visible = !active;
      crosshairHolder.active.visible = active;
    }

    layer.onRender = function() {
      onRenderRotate();
    };

    layer.onClick = layer.onInitial = layer.onMove = layer.onHandFrame = function(coordinates) {
      crosshairHolder.visible = true;
      crosshairHolder.position = coordinates.position;
      crosshairHolder.scale.x = crosshairHolder.scale.y = 0.35 + coordinates.depth;
    };



    function onRenderRotate() {
      if (rotateCrosshair === true) {
        crosshairHolder.rotation += 0.08;
      }
    }

    return layer;
  }
);