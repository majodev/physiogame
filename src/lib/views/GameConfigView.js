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
    var currentTabHash = "#general",
      validationError;

    var ObjectsConfigView = Backbone.View.extend({
      initialize: function() {
        log.debug("ObjectsConfigView: initialize");

        Handlebars.registerPartial("gameConfigItemPartial", gameConfigItemPartial);

        // instantly refresh when our model changes its values.
        this.listenTo(this.model, "change", this.render);

        // listen to errors when validates of model fails...
        this.model.on("invalid", this.alertModelNotValid);

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

        $(function() {
          // try to show the last visible tab...
          $('#myTab a[href="' + currentTabHash + '"]').tab('show');
        });

        // Add clickhandler for tab bar...
        $('#myTab a').click(function(e) {
          e.preventDefault();
          currentTabHash = e.currentTarget.hash;
          $(this).tab('show');
        });

        // finally validate current configuration and show results
        if(this.model.isValid() === false) {
          $("#statusNotification").append('<div class="alert alert-danger"><small>' + 
            '<strong>Fehler:</strong> ' +
            validationError + '</small></div>');
        } else {
          $("#statusNotification").append('<div class="alert alert-success"><small>' +
            '<strong>Status:</strong> ' +
            'Die Einstellungen sind gültig.' +
            '</small></div>');
        }

        return this; // for chaining
      },
      events: {
        // "slideStart input.parameterSlider": "sliderStart",
        "slide input.parameterSlider": "sliding",
        "slideStop input.parameterSlider": "sliderEnd",
        "click .dropdown-menu a": "dropdownClick",
        "click button.toggleButton": "toggleClick"
      },
      dropdownClick: function(event) {
        this.setModelValue(event.currentTarget.parentNode.parentNode.id, event.currentTarget.id);
      },
      sliding: function(event) {
        // only update the text while sliding...
        var newValue = Math.round(event.value * 1000) / 1000;
        $("#" + event.currentTarget.id + "-value").text(newValue);
      },
      sliderEnd: function(event) {
        // set when finished with sliding...
        this.setModelValue(event.currentTarget.id, event.value);
      },
      toggleClick: function(event) {
        this.setModelValue(event.currentTarget.id, !this.model.get(event.currentTarget.id));
      },
      setModelValue: function(key, value) {
        this.model.set(key, value);
        this.model.isValid();
        refreshGameWithNewValues();
      },
      alertModelNotValid: function(model, error) {
        // TODO: show error in interface!
        validationError = error;
        console.log(error);
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