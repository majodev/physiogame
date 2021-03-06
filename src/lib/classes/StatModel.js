define(["log", "backbone", "underscore", "gameConfig", "moment", "utils/timeFormatter", "i18n"],
  function(log, Backbone, _, gameConfig, moment, timeFormatter, i18n) {

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
      raiseSpecial: function() {
        var specialScore = this.get("specialsCatched");
        if (this.get("locked") === false && this.get("started") === true) {
          specialScore += 1;
          this.set("specialsCatched", specialScore);
        } else {
          log.warn("raiseSpecial: not started or already locked, not possible!");
        }
      },
      raiseFingerUsedOnSpecial: function(fingerCount) {
        var specialFingerUsedArray = this.get("specialFingerUsed");
        if (this.get("locked") === false && this.get("started") === true) {
          //console.log(specialFingerUsedArray);
          specialFingerUsedArray[fingerCount] += 1;

          this.set("specialFingerUsed", specialFingerUsedArray);
        } else {
          log.warn("raiseSpecial: not started or already locked, not possible!");
        }
      },
      updateAccuracy: function(hitstatMiddlepointObject) {
        var newAccuracy;

        if (this.get("locked") === false && this.get("started") === true) {

          if (_.isUndefined(hitstatMiddlepointObject) === false) {
            // first push it THEN compute it!
            runtimeAccuracyArray.push(hitstatMiddlepointObject);
            newAccuracy = computeAccuracy();

            this.set("accuracyX", newAccuracy.x);
            this.set("accuracyY", newAccuracy.y);
            this.set("accuracySum", newAccuracy.sum);
          } else {
            log.warn("updateAccuracy: received empty hitStat, autoKill?");
          }


        } else {
          log.warn("updateAccuracy: not started or already locked, not possible!");
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
        this.set("leapMovementAllZ", sessionStats.movement.all.z);
        this.set("leapMovementAllHyp", sessionStats.movement.all.hyp);
        this.set("leapMovementInsideX", sessionStats.movement.inside.x);
        this.set("leapMovementInsideY", sessionStats.movement.inside.y);
        this.set("leapMovementInsideZ", sessionStats.movement.inside.z);
        this.set("leapMovementInsideHyp", sessionStats.movement.inside.hyp);
        this.set("leapProjectionWidth", sessionStats.projection.width);
        this.set("leapProjectionHeight", sessionStats.projection.height);
        this.set("leapProjectionDepth", sessionStats.projection.depth);
        this.set("leapProjectionCenterX", sessionStats.projectionCenter.x);
        this.set("leapProjectionCenterY", sessionStats.projectionCenter.y);
        this.set("leapProjectionCenterZ", sessionStats.projectionCenter.z);
        this.set("leapFingerCountTime", sessionStats.fingerCountTime);
      },
      lock: function() {
        log.debug("StatModel: locked");
        this.set("locked", true);
        this.set("points", ((this.get("objectsCatched") * this.get("accuracySum")) + this.get("specialsCatched")) * 100);
        runtimeAccuracyArray = [];
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
          specialsCatched_count: json.specialsCatched,
          specialsFinger0_count: json.specialFingerUsed[0],
          specialsFinger1_count: json.specialFingerUsed[1],
          specialsFinger2_count: json.specialFingerUsed[2],
          specialsFinger3_count: json.specialFingerUsed[3],
          specialsFinger4_count: json.specialFingerUsed[4],
          specialsFinger5_count: json.specialFingerUsed[5],
          points_count: Math.round(json.points),
          accuracy_sum_percentage: Math.ceil(json.accuracySum * 100),
          accuracy_x_percentage: Math.ceil(json.accuracyX * 100),
          accuracy_y_percentage: Math.ceil(json.accuracyY * 100),
          config_gameMode_string: gameConfig.getFormattedCustomValue("gameMode", json.gameConfig.gameMode),
          config_gameObjectCondition_string: gameConfig.getFormattedCustomValue("gameObjectCondition", json.gameConfig.gameObjectCondition),
          config_gameMaxTime_sec: gameConfig.getValueNeededInCustomJSON("gameMaxTime", json.gameConfig),
          config_objectsToSpawn_count: json.gameConfig.objectsToSpawn,
          leap_projectionWidth_millimeter: Math.floor(json.leapProjectionWidth),
          leap_projectionHeight_millimeter: Math.floor(json.leapProjectionHeight),
          leap_projectionDepth_millimeter: Math.floor(json.leapProjectionDepth),
          leap_projectionCenterX_millimeter: Math.floor(json.leapProjectionCenterX),
          leap_projectionCenterY_millimeter: Math.floor(json.leapProjectionCenterY),
          leap_projectionCenterZ_millimeter: Math.floor(json.leapProjectionCenterZ),
          leap_movement_all_hyp_millimeter: Math.floor(json.leapMovementAllHyp),
          leap_movement_all_x_millimeter: Math.floor(json.leapMovementAllX),
          leap_movement_all_y_millimeter: Math.floor(json.leapMovementAllY),
          leap_movement_all_z_millimeter: Math.floor(json.leapMovementAllZ),
          leap_movement_inside_hyp_millimeter: Math.floor(json.leapMovementInsideHyp),
          leap_movement_inside_x_millimeter: Math.floor(json.leapMovementInsideX),
          leap_movement_inside_y_millimeter: Math.floor(json.leapMovementInsideY),
          leap_movement_inside_z_millimeter: Math.floor(json.leapMovementInsideZ),
          leap_detected_ms: json.leapDetected,
          leap_notdetected_ms: json.leapNotDetected,
          leap_inside_ms: json.leapInside,
          leap_outside_ms: json.leapOutside,
          leap_outsideLeft_ms: json.leapOutsideLeft,
          leap_outsideRight_ms: json.leapOutsideRight,
          leap_outsideTop_ms: json.leapOutsideTop,
          leap_outsideBottom_ms: json.leapOutsideBottom,
          leap_fingerTime0_ms: json.leapFingerCountTime[0],
          leap_fingerTime1_ms: json.leapFingerCountTime[1],
          leap_fingerTime2_ms: json.leapFingerCountTime[2],
          leap_fingerTime3_ms: json.leapFingerCountTime[3],
          leap_fingerTime4_ms: json.leapFingerCountTime[4],
          leap_fingerTime5_ms: json.leapFingerCountTime[5]
        };
      },
      convertToFormattedJSON: function() {
        var json = this.toJSON();

        // error handling for userName if gameConfig wasn't established...
        if (_.isUndefined(json.gameConfig) === false) {
          json.userName = gameConfig.getFormattedCustomValue("userName", json.gameConfig.userName);
        } else {
          json.userName = "--";
        }

        // table fields
        json.date = formatDateOnlyGerman(json.startDate);
        json.startDate = formatTimeOnlyGerman(json.startDate);
        json.endDate = formatTimeOnlyGerman(json.endDate);
        json.playTime = timeFormatter.formatMilliseconds(json.playTime);
        json.objectsCatched = json.objectsCatched;
        json.specialsCatched = json.specialsCatched;
        json.points = Math.round(json.points);
        json.accuracySum = Math.ceil(json.accuracySum * 100) + " %";

        // a few stats that are only displayed at advanced tab (keyValues!)
        json.advancedStats = this.getAdvancedStatKeyValues(json);

        // leap detail fields        
        json.leapStats = this.getLeapStatsKeyValues(json);

        // gameConfig detail fields
        json.gameConfig = gameConfig.generateKeyValuePairs(undefined, json.gameConfig);



        return json;
      },
      getLeapStatsKeyValues: function(json) {
        return {
          keyValues: [{
            key: i18n.t("statsProjectionArea"),
            value: Math.floor(json.leapProjectionWidth) + " x " + Math.floor(json.leapProjectionHeight) + " x " + Math.floor(json.leapProjectionDepth) + " mm"
          }, {
            key: i18n.t("statsProjectionCenter"),
            value: "x: " + Math.floor(json.leapProjectionCenterX) + "; y: " + Math.floor(json.leapProjectionCenterY) + "; z: " + Math.floor(json.leapProjectionCenterZ) + " mm"
          }, {
            key: i18n.t("statsAllMovement"),
            value: Math.floor(json.leapMovementAllHyp) + " mm"
          }, {
            key: i18n.t("statsAllowedMovement"),
            value: Math.floor(json.leapMovementInsideHyp) + " mm"
          }, {
            key: i18n.t("statsHorizontalMovement"),
            value: Math.floor(json.leapMovementAllX) + " mm"
          }, {
            key: i18n.t("statsAllowedHorizontalMovement"),
            value: Math.floor(json.leapMovementInsideX) + " mm"
          }, {
            key: i18n.t("statsVerticalMovement"),
            value: Math.floor(json.leapMovementAllY) + " mm"
          }, {
            key: i18n.t("statsAllowedVerticalMovement"),
            value: Math.floor(json.leapMovementInsideY) + " mm"
          }, {
            key: i18n.t("statsDepthMovement"),
            value: Math.floor(json.leapMovementAllZ) + " mm"
          }, {
            key: i18n.t("statsAllowedDepthMovement"),
            value: Math.floor(json.leapMovementInsideZ) + " mm"
          }, {
            key: i18n.t("statsHandTracked"),
            value: timeFormatter.formatMilliseconds(json.leapDetected)
          }, {
            key: i18n.t("statsHandNotTracked"),
            value: timeFormatter.formatMilliseconds(json.leapNotDetected)
          }, {
            key: i18n.t("statsHandWithArea"),
            value: timeFormatter.formatMilliseconds(json.leapInside)
          }, {
            key: i18n.t("statsHandOutsideArea"),
            value: timeFormatter.formatMilliseconds(json.leapOutside)
          }, {
            key: i18n.t("statsHandOutsideLeft"),
            value: timeFormatter.formatMilliseconds(json.leapOutsideLeft)
          }, {
            key: i18n.t("statsHandOutsideRight"),
            value: timeFormatter.formatMilliseconds(json.leapOutsideRight)
          }, {
            key: i18n.t("statsHandOutsideAbove"),
            value: timeFormatter.formatMilliseconds(json.leapOutsideTop)
          }, {
            key: i18n.t("statsHandOutsideBottom"),
            value: timeFormatter.formatMilliseconds(json.leapOutsideBottom)
          }, {
            key: i18n.t("stats0Finger"),
            value: timeFormatter.formatMilliseconds(json.leapFingerCountTime[0])
          }, {
            key: i18n.t("stats1Finger"),
            value: timeFormatter.formatMilliseconds(json.leapFingerCountTime[1])
          }, {
            key: i18n.t("stats2Fingers"),
            value: timeFormatter.formatMilliseconds(json.leapFingerCountTime[2])
          }, {
            key: i18n.t("stats3Fingers"),
            value: timeFormatter.formatMilliseconds(json.leapFingerCountTime[3])
          }, {
            key: i18n.t("stats4Fingers"),
            value: timeFormatter.formatMilliseconds(json.leapFingerCountTime[4])
          }, {
            key: i18n.t("stats5Fingers"),
            value: timeFormatter.formatMilliseconds(json.leapFingerCountTime[5])
          }]
        };
      },
      getAdvancedStatKeyValues: function(json) {
        return {
          keyValues: [{
            key: i18n.t("statsAccuracyX"),
            value: Math.ceil(json.accuracyX * 100) + " %"
          }, {
            key: i18n.t("statsAccuracyY"),
            value: Math.ceil(json.accuracyY * 100) + " %"
          }, {
            key: i18n.t("statsFingersUsed0"),
            value: Math.ceil(json.specialFingerUsed[0]) + " " + i18n.t("objects")
          }, {
            key: i18n.t("statsFingersUsed1"),
            value: Math.ceil(json.specialFingerUsed[1]) + " " + i18n.t("objects")
          }, {
            key: i18n.t("statsFingersUsed2"),
            value: Math.ceil(json.specialFingerUsed[2]) + " " + i18n.t("objects")
          }, {
            key: i18n.t("statsFingersUsed3"),
            value: Math.ceil(json.specialFingerUsed[3]) + " " + i18n.t("objects")
          }, {
            key: i18n.t("statsFingersUsed4"),
            value: Math.ceil(json.specialFingerUsed[4]) + " " + i18n.t("objects")
          }, {
            key: i18n.t("statsFingersUsed5"),
            value: Math.ceil(json.specialFingerUsed[5]) + " " + i18n.t("objects")
          }, {
            key: i18n.t("statsGametime"),
            value: timeFormatter.formatMilliseconds(json.gameTime)
          }]
        };
      },
      defaults: {
        objectsCatched: 0,
        specialsCatched: 0,
        finished: false,
        started: false,
        locked: false,
        accuracyX: 1,
        accuracyY: 1,
        accuracySum: 1,
        points: 0,
        specialFingerUsed: [0, 0, 0, 0, 0, 0] // 0 - 5 Fingers
      }
    });

    // LOOK OUT! - this needs to be resetted on locks from the gameSession!
    // STATIC, lifecycle managed by lock!
    var runtimeAccuracyArray = [];

    function computeAccuracy() {
      var accuracy = {
        x: 0,
        y: 0,
        sum: 0
      };
      var i = 0,
        len = runtimeAccuracyArray.length;

      for (i; i < len; i += 1) {
        accuracy.x += runtimeAccuracyArray[i].percentageX;
        accuracy.y += runtimeAccuracyArray[i].percentageY;
        accuracy.sum += runtimeAccuracyArray[i].percentageBothAxis;
      }

      accuracy.x = accuracy.x / len;
      accuracy.y = accuracy.y / len;
      accuracy.sum = accuracy.sum / len;

      return accuracy;
    }

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