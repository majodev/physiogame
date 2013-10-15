define(["backbone", "jquery", "log", "gameConfig", "underscore",
    "hbars!views/templates/gameConfigTemplate",
    "hbars!views/templates/gameConfigItemPartial",
    "Handlebars", "views/alertModal",
    "bootstrap-slider"
  ],
  function(Backbone, $, log, gameConfig, _,
    gameConfigTemplate,
    gameConfigItemPartial,
    Handlebars, alertModal) {

    // first tab
    var currentMainTab = "#general",
      currentSubBehaviourTab = "#speed",
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
          // try to show the last visible main tab...
          $('#settingsMainTab a[href="' + currentMainTab + '"]').tab('show');

          // try to show the last visible sub behaviour tab...
          $('#settingsBehaviourTab a[href="' + currentSubBehaviourTab + '"]').tab('show');

          // append the fade class to main
          $(currentMainTab).addClass("fade in");

          // append the fade class to sub
          $(currentSubBehaviourTab).addClass("fade in");
        });

        // Add clickhandler for main tab bar...
        $('#settingsMainTab a').click(function(e) {
          e.preventDefault();
          currentMainTab = e.currentTarget.hash;
          $(this).tab('show');
        });

        // Add clickhandler for sub behaviour tab bar...
        $('#settingsBehaviourTab a').click(function(e) {
          e.preventDefault();
          currentSubBehaviourTab = e.currentTarget.hash;
          $(this).tab('show');
        });

        // finally validate current configuration and show results
        if(this.model.isValid() === false) {
          $("#statusNotification").append('<div class="alert alert-danger"><small>' + 
            '<strong>Fehler:</strong> ' +
            validationError + '</small></div>');
        }
        // else {
        //   $("#statusNotification").append('<div class="alert alert-success"><small>' +
        //     '<strong>Status:</strong> ' +
        //     'Die Einstellungen sind gültig.' +
        //     '</small></div>');
        // }

        return this; // for chaining
      },
      events: {
        // "slideStart input.parameterSlider": "sliderStart",
        "slide input.parameterSlider": "sliding",
        "slideStop input.parameterSlider": "sliderEnd",
        "click .dropdown-menu a": "dropdownClick",
        "click button.toggleButton": "toggleClick",
        "click #resetToStandard": "resetAllToStandard"
      },
      dropdownClick: function(event) {
        this.setModelValue(event.currentTarget.parentNode.parentNode.id, event.currentTarget.id);
      },
      sliding: function(event) {
        // only update the text while sliding...
        var newValue = Math.round(event.value * 1000) / 1000,
          formattedValue = this.model.getFormattedValueIfNeeded(event.currentTarget.id, newValue);

        if(formattedValue !== false) {
          $("#" + event.currentTarget.id + "-value").text(formattedValue);
        } else {
          $("#" + event.currentTarget.id + "-value").text(newValue);
        }
      },
      sliderEnd: function(event) {
        // set when finished with sliding...
        this.setModelValue(event.currentTarget.id, event.value);
      },
      toggleClick: function(event) {
        this.setModelValue(event.currentTarget.id, !this.model.get(event.currentTarget.id));
      },
      resetAllToStandard: function (event) {
        log.debug("resetAllToStandard!");
        this.model.resetToDefaultValues();
        refreshGameWithNewValues();
        alertModal.show({
          head: "Standard-Werte wiederhergestellt!",
          text: "Alle Einstellungen wurden auf die Standard-Werte zurückgesetzt.",
          autoDismiss: 5000
        });
      },
      setModelValue: function(key, value) {
        this.model.set(key, value);
        //this.model.isValid();
        refreshGameWithNewValues();
      },
      alertModelNotValid: function(model, error) {
        // TODO: show error in interface!
        validationError = error;
        log.warn("validation error: " + error);
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