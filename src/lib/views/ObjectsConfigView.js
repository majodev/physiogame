define(["Backbone", "jquery", "log", "objectsConfig"],
  function(Backbone, $, log, objectsConfig) {
    var ObjectsConfigView = Backbone.View.extend({
      initialize: function() {
        log.debug("ObjectsConfigView: initialize");
        this.listenTo(this.model, "change", this.render);
        this.render();
      },
      model: objectsConfig,
      render: function() {
        console.dir(this.model.toJSON());
        this.$el.html(this.model.toJSON());

        return this; // for chaining
      }
    });

    return ObjectsConfigView;
  }
);