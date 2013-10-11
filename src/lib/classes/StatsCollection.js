define(["log", "Backbone", "classes/StatModel"],
  function(log, Backbone, StatModel) {
    
    var StatsCollection = Backbone.Collection.extend({
      model: StatModel
    });

    return StatsCollection;
  }
);