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
          log.warn("raiseScore: not started or already locked, not possible!");
        }

      },
      start: function(date) {
        if (this.get("locked") === false && this.get("started") === false) {
          this.set("startDate", date);
          this.set("gameConfig", gameConfig.toJSON());
          this.set("started", true);
        } else {
          log.warn("start: already started or locked, not possible!");
        }
      },
      end: function(date) {
        var gameTime = 0,
          roundTime = 0;

        if (this.get("locked") === false && this.get("finished") === false && this.get("started") === true) {
          this.set("endDate", date);

          // compute times...
          gameTime = moment(this.get("endDate")).diff(moment(this.get("startDate")));
          this.set("gameTime", gameTime);

          roundTime = gameTime - this.get("gameConfig").introTimerLength;

          if (roundTime > 0) {
            this.set("playTime", roundTime);
          } else {
            this.set("playTime", 0);
          }

          this.set("finished", true);
        } else {
          log.warn("end: already finished or locked, not possible!");
        }
      },
      setLeapStats: function(sessionStats) {
        this.set("leapDetected", sessionStats.time.detected);
        this.set("leapNotDetected", sessionStats.time.notDetected);
        this.set("leapInside", sessionStats.time.inside);
        this.set("leapOutside", sessionStats.time.outside.any);
        this.set("leapOutsideLeft", sessionStats.time.outside.left);
        this.set("leapOutsideRight", sessionStats.time.outside.right);
        this.set("leapOutsideTop", sessionStats.time.outside.top);
        this.set("leapOutsideBottom", sessionStats.time.outside.bottom);
        this.set("leapMovementAllX", sessionStats.movement.all.x);
        this.set("leapMovementAllY", sessionStats.movement.all.y);
        this.set("leapMovementAllHyp", sessionStats.movement.all.hyp);
        this.set("leapMovementInsideX", sessionStats.movement.inside.x);
        this.set("leapMovementInsideY", sessionStats.movement.inside.y);
        this.set("leapMovementInsideHyp", sessionStats.movement.inside.hyp);
        this.set("leapProjectionWidth", sessionStats.projection.width);
        this.set("leapProjectionHeight", sessionStats.projection.height);
      },
      lock: function() {
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
          config_objectsToSpawn_count: json.gameConfig.objectsToSpawn,
          leap_projectionWidth_millimeter: Math.floor(json.leapProjectionWidth),
          leap_projectionHeight_millimeter: Math.floor(json.leapProjectionHeight),
          leap_movement_all_hyp_millimeter: Math.floor(json.leapMovementAllHyp),
          leap_movement_all_x_millimeter: Math.floor(json.leapMovementAllX),
          leap_movement_all_y_millimeter: Math.floor(json.leapMovementAllY),
          leap_movement_inside_hyp_millimeter: Math.floor(json.leapMovementInsideHyp),
          leap_movement_inside_x_millimeter: Math.floor(json.leapMovementInsideX),
          leap_movement_inside_y_millimeter: Math.floor(json.leapMovementInsideY),
          leap_detected_ms: json.leapDetected,
          leap_notdetected_ms: json.leapNotDetected,
          leap_inside_ms: json.leapInside,
          leap_outside_ms: json.leapOutside,
          leap_outsideLeft_ms: json.leapOutsideLeft,
          leap_outsideRight_ms: json.leapOutsideRight,
          leap_outsideTop_ms: json.leapOutsideTop,
          leap_outsideBottom_ms: json.leapOutsideBottom
        };
      },
      convertToFormattedJSON: function() {
        var json = this.toJSON();

        // table fields
        json.userName = gameConfig.getFormattedCustomValue("userName", json.gameConfig.userName);
        json.date = formatDateOnlyGerman(json.startDate);
        json.startDate = formatTimeOnlyGerman(json.startDate);
        json.endDate = formatTimeOnlyGerman(json.endDate);
        json.playTime = timeFormatter.formatMilliseconds(json.playTime);
        json.gameTime = timeFormatter.formatMilliseconds(json.gameTime);
        json.objectsCatched = json.objectsCatched;

        // leap detail fields        
        json.leapStats = this.getLeapStatsKeyValues(json);

        // gameConfig detail fields
        json.gameConfig = gameConfig.generateKeyValuePairs(undefined, json.gameConfig);

        return json;
      },
      getLeapStatsKeyValues: function(json) {
        return {
          keyValues: [{
            key: "Projektionslänge",
            value: Math.floor(json.leapProjectionWidth) + " mm"
          }, {
            key: "Projektionshöhe",
            value: Math.floor(json.leapProjectionHeight) + " mm"
          }, {
            key: "Gesamtlänge aller Bewegungen (sqrt(x^2 + y^2))",
            value: Math.floor(json.leapMovementAllHyp) + " mm"
          }, {
            key: "Länge Bewegungen (sqrt(x^2 + y^2)) erlaubter Bereich",
            value: Math.floor(json.leapMovementInsideHyp) + " mm"
          }, {
            key: "Gesamtlänge aller horizontalen Bewegungen (x)",
            value: Math.floor(json.leapMovementAllX) + " mm"
          }, {
            key: "Länge horizontale Bewegungen (x) erlaubter Bereich",
            value: Math.floor(json.leapMovementInsideX) + " mm"
          }, {
            key: "Gesamtlänge aller vertikalen Bewegungen (y)",
            value: Math.floor(json.leapMovementAllY) + " mm"
          }, {
            key: "Länge vertikale Bewegungen (y) erlaubter Bereich",
            value: Math.floor(json.leapMovementInsideY) + " mm"
          }, {
            key: "Rundenzeit Hand getrackt",
            value: timeFormatter.formatMilliseconds(json.leapDetected)
          }, {
            key: "Rundenzeit nicht getrackt",
            value: timeFormatter.formatMilliseconds(json.leapNotDetected)
          }, {
            key: "Rundenzeit Hand im erlaubten Bereich",
            value: timeFormatter.formatMilliseconds(json.leapInside)
          }, {
            key: "Rundenzeit Hand außerhalb des erlaubten Bereichs",
            value: timeFormatter.formatMilliseconds(json.leapOutside)
          }, {
            key: "Rundenzeit Hand außerhalb links",
            value: timeFormatter.formatMilliseconds(json.leapOutsideLeft)
          }, {
            key: "Rundenzeit Hand außerhalb rechts",
            value: timeFormatter.formatMilliseconds(json.leapOutsideRight)
          }, {
            key: "Rundenzeit Hand außerhalb oben",
            value: timeFormatter.formatMilliseconds(json.leapOutsideTop)
          }, {
            key: "Rundenzeit Hand außerhalb unten",
            value: timeFormatter.formatMilliseconds(json.leapOutsideBottom)
          }]
        };
      },
      defaults: {
        objectsCatched: 0,
        finished: false,
        started: false,
        locked: false
      }
    });

    function formatDateGerman(date) {
      return moment(date).format("DD.MM.YYYY  HH:mm:ss");
    }

    function formatTimeOnlyGerman(date) {
      return moment(date).format("HH:mm:ss");
    }

    function formatDateOnlyGerman(date) {
      return moment(date).format("DD.MM.YYYY");
    }

    return ScoreModel;
  }
);