define(["log", "loaders/soundLoader", "gameConfig"],
  function(log, soundLoader, gameConfig) {

    var audioEnabled = gameConfig.get("audioEnabled"),
      audioBackgroundEnabled = gameConfig.get("audioBackgroundEnabled"),
      bgIsPlaying = false;

    gameConfig.on("change", function (model, options) {
      audioEnabled = gameConfig.get("audioEnabled");
      audioBackgroundEnabled = gameConfig.get("audioBackgroundEnabled");

      setBackgroundAudio();
    });

    function setBackgroundAudio() {
      if(audioBackgroundEnabled) {
        if(bgIsPlaying === false) {
          play("bg");
          bgIsPlaying = true;
        }
      } else {
        stop("bg");
        bgIsPlaying = false;
      }
    }

    function play(sound) {
      if(audioEnabled) {
        //log.debug("play sound: " + sound);
        soundLoader.getSound(sound).play();
      }
    }

    function stop(sound) {
      if(audioEnabled) {
        //log.debug("stop sound: " + sound);
        soundLoader.getSound(sound).stop();
      }
    }

    return {
      play: play,
      stop: stop
    };
  }
);