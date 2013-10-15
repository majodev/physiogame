define(["backbone", "jquery", "log", "underscore",
    "Handlebars", "game/stats",
    "hbars!views/templates/statsTemplate",
    "views/alertModal"
  ],
  function(Backbone, $, log, _,
    Handlebars, stats,
    statsTemplate,
    alertModal) {

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
          // stats: this.collection.toJSON()
          stats: stats.getFormattedJSON()
        }));
      },
      events: {
        "click #downloadCSV": "downloadCSV",
        "click #downloadJSON": "downloadJSON",
        "click #clearStorage": "clearStorage",
        "change #loadJSON :file": "loadJSON",
        "click .removeItem": "removeItem",
        "click .applySettings": "applySettings"
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
        parseLocalFile(e.target.files[0]);
      },
      removeItem: function(e) {
        var id = $("#" + e.currentTarget.id).data("id");
        stats.removeByID(id);
      },
      applySettings: function(e) {
        var btn = $("#" + e.currentTarget.id);
        var id = btn.data("id");
        btn.button("loading");
        stats.applyPreviousSettings(id);
        setTimeout(function() {
          btn.button("reset");
        }, 1500);
        alertModal.show({
          head: "Einstellungen zurückgesetzt!",
          text: "Die Einstellungen der ausgewählten Statistik wurden wiederhergestellt.",
          autoDismiss: 5000
        });
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
        };
      })(file);

      // Read in JSON as a data URL.
      reader.readAsText(file, "UTF-8");
    }

    return StatsView;
  }
);