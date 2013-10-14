define(["backbone", "jquery", "log", "underscore",
    "Handlebars", "game/stats",
    "hbars!views/templates/statsTemplate"
  ],
  function(Backbone, $, log, _,
    Handlebars, stats,
    statsTemplate) {

    var StatsView = Backbone.View.extend({
      visible: false,
      collection: stats.getCollection(),
      initialize: function() {


        // TODO: whats needed here?
        this.listenTo(this.collection, "change", this.rerenderOnChange);
        this.listenTo(this.collection, "add", this.rerenderOnChange);
        this.listenTo(this.collection, "remove", this.rerenderOnChange);
        this.listenTo(this.collection, "reset", this.rerenderOnChange);

        this.render();
      },
      rerenderOnChange: function() {
        if (this.visible) {
          this.render();
        }
      },
      render: function() {
        this.$el.html(statsTemplate({
          stats: this.collection.toJSON()
        }));
      },
      events: {
        "click #downloadCSV": "downloadCSV",
        "click #downloadJSON": "downloadJSON",
        "click #clearStorage": "clearStorage",
        "change #loadJSON :file": "loadJSON"
      },
      downloadCSV: function(e) {
        stats.downloadCSV();
      },
      downloadJSON: function(e) {
        stats.downloadJSON();
      },
      clearStorage: function(e) {
        stats.clearLocalStorage();
      },
      loadJSON: function(e) {

        // add bootstrap loading prop, so it can't be clicked another time...
        $("#loadJSON").prop("data-loading-text", "Lade...");

        parseLocalFile(e.target.files[0]);
      }
    });

    function parseLocalFile(file) {
      // from http://jsfiddle.net/jamiefearon/8kUYj/20/

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          JsonObj = e.target.result;
          var parsedJSON = JSON.parse(JsonObj);
          stats.loadFromJSON(parsedJSON);
          $("#loadJSON").removeProp("data-loading-text");
        };
      })(file);

      // Read in JSON as a data URL.
      reader.readAsText(file, 'UTF-8');
    }

    return StatsView;
  }
);