define(["log", "display/textures", "display/factory", "PIXI", "underscore", "config"],
  function(log, textures, factory, PIXI, _, config) {

    var layer = factory.makeLayer(),
      bg;

    function activate() {
      if (_.isUndefined(bg) === true) {
        bg = factory.makePIXISprite(textures.getBackgroundTexture());
        bg.position.x = 0;
        bg.position.y = 0;
        bg.anchor.x = 0;
        bg.anchor.y = 0;

        log.debug("bg activate");
      }

      layer.addChild(bg);
      scaleProperly();

      config.on("change", configChanged);
    }

    function scaleProperly() {

      var factorx = 1 + (config.get("width") / 640);
      var factory = 1 + (config.get("height") / 480);

      bg.scale.x = factorx;
      bg.scale.y = factory;
    }

    function configChanged(model, options) {
      scaleProperly();
    }

    function deactivate() {
      layer.removeChild(bg);
      config.off("change", configChanged);
    }

    return {
      activate: activate,
      deactivate: deactivate,
      getLayer: function() {
        return layer;
      }
    };

  }
);