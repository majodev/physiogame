define(["Poll", "utils/publisher", "gameConfig", "log"],
  function(Poll, publisher, gameConfig, log) {

    var events = publisher.make(),
      TIMER_TICK_MS = 100, // global ticks per call
      config_introMaxMs,
      config_introObjectPerTick,
      introRunning = false,
      introObjectTick = 0,
      introTick = 0;

    (function startup() {
      readGameConfig();
      resetTimerInternals();
    }());

    gameConfig.on("change", function(model, options) {
      stop();
      readGameConfig();
    });

    function readGameConfig() {
      config_introMaxMs = gameConfig.get("introTimerLength");
      config_introObjectPerTick = TIMER_TICK_MS / (config_introMaxMs / gameConfig.get("objectsToSpawn"));
    }

    function start() {
      // make sure only one runs...
      stop();

      // reset timer internals (to 0)
      resetTimerInternals();

      events.trigger("introStart", introTick); // trigger on start...

      Poll.start({
        name: "gameIntroTimer",
        interval: TIMER_TICK_MS,
        action: function() {

          var introSpawnObjectCount = Math.floor(introObjectTick);

          if (introTick > 0 && introTick < config_introMaxMs) {
            events.trigger("introTick", introTick);
            if (introTick % 1000 === 0) {
              events.trigger("introTickSecond", introTick);
            }
          }

          if(introSpawnObjectCount > 1) {
            events.trigger("introTickSpawnObject", introSpawnObjectCount);
            introObjectTick -= introSpawnObjectCount;
          }

          if (introTick >= config_introMaxMs) {
            stop();
          }

          introTick += TIMER_TICK_MS;
          introObjectTick += config_introObjectPerTick;
        }
      });

      introRunning = true;
    }

    function stop() {
      if (introRunning) {
        Poll.stop("gameIntroTimer");

        if(introObjectTick > 0) {
          events.trigger("introTickSpawnObject", Math.ceil(introObjectTick));
          introObjectTick = 0;
        }

        events.trigger("introEnd", introTick); // trigger on end...

        resetTimerInternals();
      }
    }

    function resetTimerInternals() {
      introRunning = false;
      introTick = 0;
    }

    function getIntroTick() {
      return introTick;
    }

    return {
      start: start,
      stop: stop,
      events: events,
      getIntroTick: getIntroTick
    };
  });