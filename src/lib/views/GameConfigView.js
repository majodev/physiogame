define(["Backbone", "jquery", "log", "gameConfig", "underscore",
    "hbars!views/templates/gameConfigTemplate", "bootstrap-slider"
  ],
  function(Backbone, $, log, gameConfig, _, gameConfigTemplate) {

    var ObjectsConfigView = Backbone.View.extend({
      initialize: function() {
        log.debug("ObjectsConfigView: initialize");
        this.listenTo(this.model, "change", this.render);
        this.render();
      },
      model: gameConfig,
      render: function() {
        this.$el.html(gameConfigTemplate(this.model.generateKeyValuePairs()));
        $("input.parameterSlider").slider();
        $(".slider-horizontal").css("width", "150px");
        return this; // for chaining
      },
      events: {
        // "slideStart input.parameterSlider": "sliderStart",
        "slide input.parameterSlider": "sliding",
        "slideStop input.parameterSlider": "sliderEnd",
        "click .dropdown-menu a": "dropdownClick"
      },
      // sliderStart: function(event) {},
      dropdownClick: function(event) {
        //console.dir(event.currentTarget.parentNode.parentNode.id + " - " + event.currentTarget.id);
        this.setModelValue(event.currentTarget.parentNode.parentNode.id, event.currentTarget.id);
      },
      sliding: function(event) {
        var newValue = Math.round(event.value * 1000) / 1000;
        $("#" + event.currentTarget.id + "-value").text(newValue);
      },
      sliderEnd: function(event) {
        this.setModelValue(event.currentTarget.id, event.value);
      },
      setModelValue: function(key, value) {
        this.model.set(key, value);
        refreshGameWithNewValues();
      }
    });

    function refreshGameWithNewValues() {
      require(["base/sceneManager"], function(sceneManager) {
        //console.dir(sceneManager);
        sceneManager.resetCurrentScene();
      });
    }

    return ObjectsConfigView;
  }
);