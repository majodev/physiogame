define(["base/displayManager", "base/leapManager", "game/textures",
    "PIXI", "utils/publisher", "classes/Layer", "moment", "underscore"
  ],
  function(displayManager, leapManager, textures,
    PIXI, publisher, Layer, moment, _) {

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
      lastLeapInput,
      LOCK_MOUSE_AFTER_LEAP_INPUT_FOR_MS = 1000;

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

    layer.onClick = layer.onInitial = layer.onMove = layer.onHandFrame = function(coordinates) {
      if(coordinates.leapCoordinates === true) {
        lastLeapInput = moment();
      }

      if(coordinates.leapCoordinates === false && _.isUndefined(lastLeapInput) === false) {
        if(moment().diff(lastLeapInput) <= LOCK_MOUSE_AFTER_LEAP_INPUT_FOR_MS) {
          return;
        }
      }

      crosshairSprite.position = coordinates.position;
      crosshairSprite.scale.x = crosshairSprite.scale.y = 0.35 + coordinates.depth;
    };



    function onRenderRotate() {
      crosshairSprite.rotation += 0.08;
    }

    return layer;
  }
);