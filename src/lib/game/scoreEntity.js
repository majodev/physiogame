define(["classes/ScoreModel"],
  function(ScoreModel) {

    var score = new ScoreModel({
      objectsCatched: 0
    });

    return score;
  }
);