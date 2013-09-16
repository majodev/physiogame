define(["Backbone", "jquery", "log", "objectsConfig", "underscore",
    "hbars!views/templates/objectsConfigTemplate", "bootstrap-slider"
  ],
  function(Backbone, $, log, objectsConfig, _, objectsConfigTemplate) {
    
    var ObjectsConfigView = Backbone.View.extend({
      initialize: function() {
        log.debug("ObjectsConfigView: initialize");
        this.listenTo(this.model, "change", this.render);
        this.render();
      },
      model: objectsConfig,
      render: function() {
        this.$el.html(objectsConfigTemplate(this.model.generateKeyValuePairs()));
        $("input.parameterSlider").slider();
        return this; // for chaining
      },
      events: {
        "slideStart input.parameterSlider": "sliderStart",
        "slide input.parameterSlider": "sliding",
        "slideStop input.parameterSlider": "sliderEnd"
      },
      sliderStart: function (event) {
      },
      sliding: function (event) {
        var newValue = Math.round(event.value * 1000) / 1000;
        $("#" + event.currentTarget.id + "-value").text(newValue);
      },
      sliderEnd: function (event) {
        this.setModelValue(event.currentTarget.id, event.value);
      },
      setModelValue: function (key, value) {
        this.model.set(key, value);
        refreshGameWithNewValues();
      }
    });

    function refreshGameWithNewValues() {
      require(["base/sceneManager"], function (sceneManager) {
        console.dir(sceneManager);
        sceneManager.resetCurrentScene();
      });
    }

    return ObjectsConfigView;
  }
);