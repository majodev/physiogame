define(["backbone", "display/factory"],
  function(Backbone, factory) {

    var SceneModel = Backbone.Model.extend({
      activate: function() {

        var i = 0,
          layers = this.get("layers"),
          scene = this.get("scene"),
          len = this.get("layers").length;

        if (this.get("running") === false) {

          for (i; i < len; i += 1) {
            layers[i].activate();
            scene.addChild(layers[i].getLayer());
          }

          this.set("running", true);
        }

      },
      deactivate: function() {

        var i = 0,
          layers = this.get("layers"),
          scene = this.get("scene"),
          len = layers.length;

        if (this.get("running") === true) {

          for (i; i < len; i += 1) {
            layers[i].deactivate();
            scene.removeChild(layers[i].getLayer());
          }

          this.set("running", false);
        }

      },
      getScene: function() {
        return this.get("scene");
      },
      getRunning: function() {
        return this.get("running");
      },
      defaults: {
        scene: factory.makeScene(),
        layers: [],
        running: false
      }
    });

    return SceneModel;
  }
);