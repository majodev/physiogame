define(["display/textures", "display/factory", "PIXI", "underscore", "config"],
  function(textures, factory, PIXI, _, config) {

    var layer = factory.makeLayer(),
      bg;


    function activate() {
      if (_.isUndefined(bg) === true) {
        bg = factory.makePIXISprite(textures.getBackgroundTexture());
        bg.position.x = 0;
        bg.position.y = 0;
        bg.anchor.x = 0;
        bg.anchor.y = 0;
        scaleProperly();
        layer.addChild(bg);

        config.on("change", configChanged);

        console.log("bg activate");
      }
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