define(["Backbone"],
  function(Backbone) {

    var ScoreModel = Backbone.Model.extend({
      raiseScore: function() {
        var currentScore = this.get("aliensKilled");
        currentScore += 1;

        this.set("aliensKilled", currentScore);
        console.log("raiseScore to " + currentScore);
      },
      resetScore: function() {
        this.set("aliensKilled", 0);
        console.log("resetScore to " + this.get("aliensKilled"));
      },
      defaults: {
        aliensKilled: 0
      }
    });

    var score = new ScoreModel({
      aliensKilled: 0
    });

    return score;
  }
);