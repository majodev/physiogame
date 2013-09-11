define(["log", "Backbone"],
  function(log, Backbone) {
    
    var ScoreModel = Backbone.Model.extend({
      raiseScore: function() {
        var currentScore = this.get("aliensKilled");
        currentScore += 1;

        this.set("aliensKilled", currentScore);
        //log.trace("raiseScore to " + currentScore);
      },
      resetScore: function() {
        this.set("aliensKilled", 0);
        log.debug("resetScore to " + this.get("aliensKilled"));
      },
      defaults: {
        aliensKilled: 0
      }
    });

    return ScoreModel;
  }
);