define(["Backbone", "jquery", "log", "gameConfig", "underscore",
    "hbars!views/templates/gameConfigTemplate", 
    "hbars!views/templates/gameConfigItemPartial",
    "Handlebars",
    "bootstrap-slider"
  ],
  function(Backbone, $, log, gameConfig, _,
    gameConfigTemplate,
    gameConfigItemPartial,
    Handlebars) {

    // first tab
    var currentTabHash = "#general";

    var ObjectsConfigView = Backbone.View.extend({
      initialize: function() {
        log.debug("ObjectsConfigView: initialize");

        Handlebars.registerPartial("gameConfigItemPartial", gameConfigItemPartial);
        
        this.listenTo(this.model, "change", this.render);
        this.render();
      },
      model: gameConfig,
      render: function() {
        // render the template
        //this.$el.html(gameConfigTemplate(this.model.generateKeyValuePairs()));
        
        this.$el.html(gameConfigTemplate(this.model.getKeyValueCategoryPairs()));
        
        // add the slider functionality (each time needed!)
        $("input.parameterSlider").slider();
        $(".slider-horizontal").css("width", "150px");

        $(function () {
          // try to show the last visible tab...
          $('#myTab a[href="' + currentTabHash + '"]').tab('show');
        });

        // Add clickhandler for tab bar...
        $('#myTab a').click(function (e) {
          e.preventDefault();
          currentTabHash = e.currentTarget.hash;
          $(this).tab('show');
        });

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