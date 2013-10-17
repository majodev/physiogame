define(["Poll", "utils/publisher", "gameConfig", "log"],
  function(Poll, publisher, gameConfig, log) {

    var events = publisher.make(),
      TIMER_TICK_MS = 100, // global ticks per call
      config_roundMaxMs,
      config_reattachEveryMs,
      config_loopInfinite = false,
      roundRunning = false,
      roundTick = 0,
      reattachTick = 0;

    (function startup() {
      readGameConfig();
      resetTimerInternals();
    }());

    gameConfig.on("change", function(model, options) {
      stop();
      readGameConfig();
    });

    function readGameConfig() {
      if (gameConfig.checkKeyIsEnabled("gameMaxTime") === true) {
        config_roundMaxMs = gameConfig.get("gameMaxTime") * 1000;
        config_reattachEveryMs = gameConfig.get("gameReattachObjectAfterMs");
        config_loopInfinite = false;
      } else {
        config_roundMaxMs = -1;
        config_reattachEveryMs = -1;
        config_loopInfinite = true;
      }

      //log.debug("timerRound: config_loopInfinite=" + config_loopInfinite);
    }

    function start() {
      // make sure only one runs...
      stop();

      // reset timer internals (to 0)
      resetTimerInternals();

      events.trigger("roundStart", roundTick); // trigger on start...
      //log.debug("roundStart: " + roundTick);

      Poll.start({
        name: "gameRoundTimer",
        interval: TIMER_TICK_MS,
        action: function() {
          // if there is a limit....
          if (config_loopInfinite === false) {
            if (roundTick > 0 && roundTick < config_roundMaxMs) {
              events.trigger("roundTick", roundTick);
              if (roundTick % 1000 === 0) {
                events.trigger("roundTickSecond", roundTick);
              }
            }

            if (roundTick >= config_roundMaxMs) {
              stop();
            }

            if (reattachTick >= config_reattachEveryMs) {
              events.trigger("roundReattach", roundTick);
              reattachTick -= config_reattachEveryMs;
            }
          } else { // no limit...
            if (roundTick > 0) {
              events.trigger("roundTick", roundTick);
              if (roundTick % 1000 === 0) {
                events.trigger("roundTickSecond", roundTick);
              }
            }
          }

          roundTick += TIMER_TICK_MS;
          reattachTick += TIMER_TICK_MS;
        }
      });

      roundRunning = true;
    }

    function stop() {
      if (roundRunning) {
        Poll.stop("gameRoundTimer");
        events.trigger("roundEnd", roundTick); // trigger on end...
        
        resetTimerInternals();
      }
    }

    function resetTimerInternals() {
      roundRunning = false;
      roundTick = 0;
      reattachTick = 0;
    }

    function getRoundTick() {
      return roundTick;
    }

    return {
      start: start,
      stop: stop,
      events: events,
      getRoundTick: getRoundTick
    };
  });