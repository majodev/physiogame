define(["log", "backbone"],
  function(log, Backbone) {
    
    var ScoreModel = Backbone.Model.extend({
      raiseScore: function() {
        var currentScore = this.get("objectsCatched");
        currentScore += 1;

        this.set("objectsCatched", currentScore);
        //log.trace("raiseScore to " + currentScore);
      },
      // resetScore: function() {
      //   this.set("objectsCatched", 0);
      //   log.debug("resetScore to " + this.get("objectsCatched"));
      // },
      defaults: {
        objectsCatched: 0
      }
    });

    return ScoreModel;
  }
);