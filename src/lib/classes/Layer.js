define(["module", "display/factory"],
  function(module, factory) {
    var Layer = function () {
      this.width = config.get("width");
      this.height = config.get("height");
      this.pixiLayer = factory.makeLayer();
    };

    Layer.prototype = {
      constructor: Layer,
      activate: function () {

      },
      deactivate: function () {

      },
      getLayer: function () {
        return this.pixiLayer;
      }
    };

    return Layer;
  }
);