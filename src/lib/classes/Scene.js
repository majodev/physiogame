define(["underscore", "PIXI", "utils/publisher"],
  function(_, PIXI, publisher) {


    var Scene = function(options) {



      this.running = false;
      this.pixiScene = new PIXI.DisplayObjectContainer();
      this.events = publisher.make();

      if (_.isUndefined(options) || _.isUndefined(options.layers) || _.isUndefined(options.id)) {
        throw new Error("A Scene needs to have an id and layers!");
      }

      this.layers = options.layers;
      this.id = options.id;
    };

    Scene.prototype = {
      constructor: Scene,
      activate: function() {
        var i = 0,
          len = this.layers.length;

        if (this.running === false) {
          for (i; i < len; i += 1) {
            this.layers[i].events.on("sceneNotification", this.onLayerEvent, this);
            this.layers[i].activate();
            this.pixiScene.addChild(this.layers[i].getLayer());
          }

          this.running = true;
        }
      },
      deactivate: function() {
        var i = 0,
          len = this.layers.length;

        if (this.running === true) {

          for (i; i < len; i += 1) {
            this.layers[i].events.off("sceneNotification", this.onLayerEvent, this);
            this.layers[i].deactivate();
            this.pixiScene.removeChild(this.layers[i].getLayer());
          }

          this.running = false;
        }
      },
      getScene: function() {
        return this.pixiScene;
      },
      getRunning: function() {
        return this.running;
      },
      onLayerEvent: function(options) {
        this.events.trigger("sceneLayerEvent", options);
      }
    };

    return Scene;
  }
);