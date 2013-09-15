define(["log", "display/textures", "display/factory", "PIXI", "underscore", "config", "classes/Layer"],
  function(log, textures, factory, PIXI, _, config, Layer) {

    var layer = new Layer(),
      bg;

    layer.onActivate = function () {
      if (_.isUndefined(bg) === true) {

        bg = factory.makePIXISprite(textures.getBackgroundTexture());
        bg.position.x = 0;
        bg.position.y = 0;
        bg.anchor.x = 0;
        bg.anchor.y = 0;

        log.debug("bg activate");
      }

      this.addChild(bg);
      scaleProperly();
    };

    function scaleProperly() {

      var factorx = 1 + (layer.width / 640);
      var factory = 1 + (layer.height / 480);

      bg.scale.x = factorx;
      bg.scale.y = factory;
    }

    return layer;

  }
);