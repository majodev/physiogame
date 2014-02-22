define(["log", "loaders/soundLoader", "gameConfig", "underscore"],
  function(log, soundLoader, gameConfig, _) {

    var audioEnabled = gameConfig.get("audioEnabled"),
      audioBackgroundEnabled = gameConfig.get("audioBackgroundEnabled"),
      currentBGMusic,
      lastCalledBGMusic;

    gameConfig.on("change", function(model, options) {
      audioEnabled = gameConfig.get("audioEnabled");
      audioBackgroundEnabled = gameConfig.get("audioBackgroundEnabled");

      if (audioBackgroundEnabled === false) {
        stopBackgroundMusic();
      } else {
        if (_.isUndefined(lastCalledBGMusic) === false) {
          playBackgroundMusic(lastCalledBGMusic);
        }
      }
    });

    function play(sound) {
      if (audioEnabled) {
        //log.debug("play: " + sound);
        soundLoader.getSound(sound).play();
      }
    }

    function stop(sound) {
      if (audioEnabled) {
        soundLoader.getSound(sound).stop();
      }
    }

    function stopBackgroundMusic() {
      if (_.isUndefined(currentBGMusic) === false) {
        //stop(currentBGMusic);
        soundLoader.getSound(currentBGMusic).stop();
        currentBGMusic = undefined;
      }
    }

    function playBackgroundMusic(newBGMusic) {
      lastCalledBGMusic = newBGMusic;
      if (_.isUndefined(currentBGMusic) === false) {
        // something plays currently...
        if (newBGMusic === currentBGMusic) {
          // already playing dont do anything.
        } else {
          //stop(currentBGMusic);
          soundLoader.getSound(currentBGMusic).stop();
          playBGInternal(newBGMusic);
        }
      } else {
        // nothing plays, push it.
        playBGInternal(newBGMusic);
      }
    }

    function playBGInternal(newBGMusic) { // not public.
      if (audioBackgroundEnabled === true) {
        //log.debug("Playing Background Audio...");
        
        //play(newBGMusic);
        soundLoader.getSound(newBGMusic).play();

        currentBGMusic = newBGMusic;
      } else {
        //log.debug("Ignored Playing Background Audio!");
        currentBGMusic = undefined;
      }
    }

    return {
      play: play,
      stop: stop,
      playBackgroundMusic: playBackgroundMusic,
      stopBackgroundMusic: stopBackgroundMusic
    };
  }
);