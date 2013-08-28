define(["displayController", "display/assets", "display/factory",
    "PIXI", "underscore", "config"
  ],
  function(displayController, assets, factory, PIXI, _, config) {

    var layer = factory.makeLayer(),
      bg;


    function init() {
      if (_.isUndefined(bg) === true) {
        bg = factory.makePIXISprite(assets.getBackgroundTexture());
        bg.position.x = 0;
        bg.position.y = 0;
        bg.anchor.x = 0;
        bg.anchor.y = 0;
        scaleProperly();
        layer.addChild(bg);

        config.on("change", configChanged);

        console.log("bg init");
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

    function kill() {
      layer.removeChild(bg);
    }

    return {
      activate: init,
      deactivate: kill,
      getLayer: function() {
        return layer;
      }
    };

  }
);