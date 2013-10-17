define(["log", "backbone", "gameConfig", "moment", "utils/timeFormatter"],
  function(log, Backbone, gameConfig, moment, timeFormatter) {

    var ScoreModel = Backbone.Model.extend({
      raiseScore: function() {
        var currentScore = this.get("objectsCatched");

        if (this.get("locked") === false && this.get("started") === true) {
          currentScore += 1;

          this.set("objectsCatched", currentScore);

          if (currentScore >= gameConfig.get("objectsToSpawn")) {
            this.trigger("allObjectsCatched", currentScore);
          }
        } else {
          log.error("raiseScore: not started or already locked, not possible!");
        }

      },
      start: function() {
        if (this.get("locked") === false && this.get("started") === false) {
          this.set("startDate", moment().toDate());
          this.set("gameConfig", gameConfig.toJSON());
          this.set("started", true);
        } else {
          log.error("start: already started or locked, not possible!");
        }
      },
      end: function() {
        var gameTime = 0,
          roundTime = 0;

        if (this.get("locked") === false && this.get("finished") === false && this.get("started") === true) {
          this.set("endDate", moment().toDate());
          
          // compute times...

          gameTime = moment(this.get("endDate")).diff(moment(this.get("startDate")));
          this.set("gameTime", gameTime);

          roundTime = gameTime - this.get("gameConfig").introTimerLength;

          if(roundTime > 0) {
            this.set("playTime", roundTime);
          } else {
            this.set("playTime", 0);
          }          

          this.set("finished", true);
        } else {
          log.error("end: already finished or locked, not possible!");
        }
      },
      lock: function () {
        this.set("locked", true);
      },
      convertToCSV: function() {
        var json = this.toJSON();
        return {
          id: json.id,
          config_userName_string: gameConfig.getFormattedCustomValue("userName", json.gameConfig.userName),
          startDate_date: formatDateGerman(json.startDate),
          endDate_date: formatDateGerman(json.endDate),
          gameTime_ms: json.gameTime,
          playTime_ms: json.playTime,
          catched_count: json.objectsCatched,
          config_gameMode_string: gameConfig.getFormattedCustomValue("gameMode", json.gameConfig.gameMode),
          config_gameMaxTime_sec: gameConfig.getValueNeededInCustomJSON("gameMaxTime", json.gameConfig),
          config_objectsToSpawn_count: json.gameConfig.objectsToSpawn
        };
      },
      convertToFormattedJSON: function() {
        var json = this.toJSON();

        json.userName = gameConfig.getFormattedCustomValue("userName", json.gameConfig.userName);
        json.startDate = formatDateGerman(json.startDate);
        json.endDate = formatDateGerman(json.endDate);
        json.playTime = timeFormatter.formatMilliseconds(json.playTime);
        json.gameTime = timeFormatter.formatMilliseconds(json.gameTime);
        json.objectsCatched = json.objectsCatched;
        json.gameConfig = gameConfig.generateKeyValuePairs(undefined, json.gameConfig);

        return json;
      },
      defaults: {
        objectsCatched: 0,
        finished: false,
        started: false,
        locked : false
      }
    });

    function formatDateGerman(date) {
      return moment(date).format("DD.MM.YYYY  HH:mm:ss");
    }

    return ScoreModel;
  }
);