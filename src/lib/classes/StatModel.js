define(["log", "backbone", "gameConfig"],
  function(log, Backbone, gameConfig) {
    
    var ScoreModel = Backbone.Model.extend({
      raiseScore: function() {
        var currentScore = this.get("objectsCatched");
        currentScore += 1;

        this.set("objectsCatched", currentScore);

        if(currentScore >= gameConfig.get("objectsToSpawn")) {
          this.trigger("allObjectsCatched", currentScore);
        }

      },
      defaults: {
        objectsCatched: 0,
        finished: false
      }
    });

    return ScoreModel;
  }
);