define(["game/stats", "game/timerRound", "game/timerIntro", "log", "gameConfig",
  "utils/publisher", "game/leapSession", "moment", "base/soundBridge"],
  function(stats, timerRound, timerIntro, log, gameConfig,
    publisher, leapSession, moment, soundBridge) {

    var sessionRunning = false,
      currentStat,
      events = publisher.make();

    function newSession() {
      var startMoment;

      if (sessionRunning === false) {
        
        events.trigger("newSession");
        log.debug("gameSession: newSession");
        
        // make a new stat entity via the controller
        currentStat = stats.getNew();

        // set the start date of the stat and leapSession
        startMoment = moment();
        currentStat.start(startMoment.toDate());
        leapSession.startSession(startMoment);

        // evaluate the game conditions and set listeners appropriatly
        setGameSuccessCondition();

        // hop to intro phase
        phase_1_intro();
        sessionRunning = true;
      }
    }

    function endSession() {
      var endMoment;
      if (sessionRunning === true) {

        // the moment it ended
        endMoment = moment();

        // end the leap session and set the dates in currentStat and SAVE it
        leapSession.endSession(endMoment);
        currentStat.setLeapStats(leapSession.getSessionStats());
        currentStat.end(endMoment.toDate());
        stats.saveCurrent();

        // notify listeners and clear session runtime variables
        events.trigger("endSession");
        log.debug("gameSession: endSession");
        clearSessionRuntimeSettings();

        sessionRunning = false;
      }
    }

    function setGameSuccessCondition() {
      var gameMode = gameConfig.get("gameMode");

      switch (gameMode) {
        case "clearInTime":
          timerRound.events.on("roundEnd", endSession);
          break;
        case "clearAllObjects":
          currentStat.on("allObjectsCatched", endSession);
          break;
        default:
          log.error("gameSession: gameMode not supported!");
          break;
      }
    }

    function phase_1_intro() {
      //log.debug("gameSession: phase_1_intro");
      timerIntro.events.on("introEnd", phase_2_round);
      timerIntro.start();
      soundBridge.play("roundintro");
    }

    function phase_2_round() {
      //log.debug("gameSession: phase_2_round");
      timerIntro.events.off("introEnd", phase_2_round);
      timerRound.start();
      soundBridge.play("roundstart");
    }

    function clearSessionRuntimeSettings() {
      // listeners from phases
      timerIntro.events.off("introEnd", phase_2_round);

      // listeners from gameCondition
      timerRound.events.off("roundEnd", endSession);
      currentStat.off("allObjectsCatched", endSession);

      // timers
      timerIntro.stop();
      timerRound.stop();
    }

    return {
      newSession: newSession,
      endSession: endSession,
      events: events
    };

  }
);