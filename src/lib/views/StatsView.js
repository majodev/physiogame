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
      initialize: function () {


        // TODO: whats needed here?
        this.listenTo(this.collection, "change", this.rerenderOnChange);
        this.listenTo(this.collection, "add", this.rerenderOnChange);
        this.listenTo(this.collection, "remove", this.rerenderOnChange);
        this.listenTo(this.collection, "reset", this.rerenderOnChange);

        this.render();
      },
      rerenderOnChange: function () {
        if(this.visible) {
            this.render();
        }
      },
      render: function () {
        this.$el.html(statsTemplate({stats: this.collection.toJSON()}));
      },
      events: {
        "click #downloadCSV": "downloadCSV",
        "click #clearStorage": "clearStorage"
      },
      downloadCSV: function (e) {
        stats.downloadCSV();
      },
      clearStorage: function (e) {
        stats.clearLocalStorage();
      }
    });

    return StatsView;
  }
);