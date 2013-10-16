define(["log", "loaders/soundLoader", "gameConfig"],
  function(log, soundLoader, gameConfig) {

    var audioEnabled = gameConfig.get("audioEnabled"),
      audioBackgroundEnabled = gameConfig.get("audioBackgroundEnabled");

    gameConfig.on("change", function (model, options) {
      audioEnabled = gameConfig.get("audioEnabled");
      audioBackgroundEnabled = gameConfig.get("audioBackgroundEnabled");

      setBackgroundAudio();
    });

    function setBackgroundAudio() {
      if(audioBackgroundEnabled && audioEnabled) {
        play("bg");
      } else {
        stop("bg");
      }
    }

    function play(sound) {
      if(audioEnabled) {
        soundLoader.getSound(sound).play();
      }
    }

    function stop(sound) {
      if(audioEnabled) {
        soundLoader.getSound(sound).stop();
      }
    }

    return {
      play: play,
      stop: stop
    };
  }
);