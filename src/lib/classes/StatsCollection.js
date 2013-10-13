define(["log", "classes/StatModel", "underscore", "backbone", "backbone.localStorage"],
  function(log, StatModel, _, Backbone) {
    
    var StatsCollection = Backbone.Collection.extend({
      model: StatModel,
      localStorage: new Backbone.LocalStorage("StatsCollection")
    });

    return StatsCollection;
  }
);