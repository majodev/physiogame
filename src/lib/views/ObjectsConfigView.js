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

        //console.dir( _.keys(this.model.toJSON()) );

        generateKeyValuePairs(this.model);

        this.$el.html(objectsConfigTemplate(generateKeyValuePairs(this.model)));

        $("input.parameterSlider").slider();

        // .on("slide", function (event) {
        //   console.log("slider event: " + event.currentTarget.id + " value: " + event.value);
        //   console.dir(event);
        // });

        return this; // for chaining
      },
      events: {
        "slideStart input.parameterSlider": "sliderStart",
        "slide input.parameterSlider": "sliding",
        "slideStop input.parameterSlider": "sliderEnd"
      },
      sliderStart: function (event) {
        //console.log("test");
        console.log("slider starts event: " + event.currentTarget.id + " value: " + event.value);
      },
      sliding: function (event) {
        //console.log("test");
        console.log("sliding event: " + event.currentTarget.id + " value: " + event.value);
      },
      sliderEnd: function (event) {
        //console.log("test");
        console.log("slider ends event: " + event.currentTarget.id + " value: " + event.value);
        this.setModelValue(event.currentTarget.id, event.value);
      },
      setModelValue: function (key, value) {
        this.model.set(key, value);
      }
    });

    function generateKeyValuePairs(model) {
      var json = model.toJSON();
      var keyArray = _.keys(model.toJSON());
      var returnArray = [];
      var i = 0,
        len = keyArray.length;
      for (i; i < len; i += 1) {
        returnArray.push({
          objectKey: keyArray[i],
          objectValue: json[keyArray[i]]
        });
      }

      //console.dir(returnArray);

      return {keyValues: returnArray};
    }

    return ObjectsConfigView;
  }
);