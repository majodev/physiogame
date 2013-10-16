define(["game/stats", "game/timerRound", "game/timerIntro", "log"],
  function(stats, timerRound, timerIntro, log) {

    var sessionRunning = false;

    function newSession() {
      if(sessionRunning === false) {
        log.debug("gameSession: newSession");
        stats.getNew();
        phase_1_intro();
        sessionRunning = true;
      }
    }

    function endSession() {
      if(sessionRunning === true) {
        log.debug("gameSession: endSession");
        stopAll();
        stats.saveCurrent();
        sessionRunning = false;
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

    function stopAll() {
      //log.debug("gameSession: stopAll");
      timerIntro.events.off("introEnd", phase_2_round);
      timerIntro.stop();
      timerRound.stop();
    }

    return {
      newSession: newSession,
      endSession: endSession
    };

  }
);