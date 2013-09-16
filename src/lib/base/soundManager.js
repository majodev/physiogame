define(["log", "loaders/soundLoader"],
  function(log, soundLoader) {

    var soundEnabled = false,
      explosion,
      hitted;

    function init() {
      log.debug("soundController: init");
      explosion = soundLoader.getSound("explosion");
      hitted = soundLoader.getSound("hitted");
      bg = soundLoader.getSound("bg");

      background();
    }

    function explode() {
      if(soundEnabled) {
        explosion.play();
      }
    }

    function hit() {
      if(soundEnabled) {
        hitted.play();
      }
    }

    function background() {
      if(soundEnabled) {
        bg.loop = true;
        bg.play();
      }
    }

    function toggleSound() {
      
      if(soundEnabled) {
        bg.stop();
      } else {
        bg.play();
      }

      soundEnabled = !soundEnabled;
    }

    function getSoundEnabled() {
      return soundEnabled;
    }

    return {
      init: init,
      explode: explode,
      hit: hit,
      background: background,
      toggleSound: toggleSound,
      getSoundEnabled: getSoundEnabled
    };
  }
);