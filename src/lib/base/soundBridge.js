define(["log", "loaders/soundLoader", "gameConfig"],
  function(log, soundLoader, gameConfig) {

    // var soundEnabled = false,
    //   explosion,
    //   hitted;

    var audioEnabled = gameConfig.get("audioEnabled"),
      audioBackgroundEnabled = gameConfig.get("audioBackgroundEnabled");

    // function init() {
    //   log.debug("soundController: init");
    //   explosion = soundLoader.getSound("explosion");
    //   hitted = soundLoader.getSound("hitted");
    //   bg = soundLoader.getSound("bg");

    //   background();
    // }

    // function explode() {
    //   if(soundEnabled) {
    //     explosion.play();
    //   }
    // }

    // function hit() {
    //   if(soundEnabled) {
    //     hitted.play();
    //   }
    // }

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

    // function background() {
    //   if(soundEnabled) {
    //     bg.loop = true;
    //     bg.play();
    //   }
    // }

    // function toggleSound() {
      
    //   if(soundEnabled) {
    //     bg.stop();
    //   } else {
    //     bg.play();
    //   }

    //   soundEnabled = !soundEnabled;
    // }

    function getSoundEnabled() {
      return soundEnabled;
    }

    return {
      play: play,
      stop: stop
    };
  }
);