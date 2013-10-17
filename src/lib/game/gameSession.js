define(["game/stats", "game/timerRound", "game/timerIntro", "log", "gameConfig",
  "utils/publisher"],
  function(stats, timerRound, timerIntro, log, gameConfig,
    publisher) {

    var sessionRunning = false,
      currentStat,
      events = publisher.make();

    function newSession() {
      if (sessionRunning === false) {
        events.trigger("newSession");
        log.debug("gameSession: newSession");
        currentStat = stats.getNew();
        currentStat.start();
        setGameSuccessCondition();
        phase_1_intro();
        sessionRunning = true;
      }
    }

    function endSession() {
      if (sessionRunning === true) {
        events.trigger("endSession");
        log.debug("gameSession: endSession");
        clearSessionRuntimeSettings();
        currentStat.end();
        stats.saveCurrent();
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
    }

    function phase_2_round() {
      //log.debug("gameSession: phase_2_round");
      timerIntro.events.off("introEnd", phase_2_round);
      timerRound.start();
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