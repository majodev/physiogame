define(["log", "loaders/soundLoader"],
  function(log, soundLoader) {

    var explosion,
      hitted;

    function init() {
      log.debug("soundController: init");
      explosion = soundLoader.getSound("explosion");
      hitted = soundLoader.getSound("hitted");
      bg = soundLoader.getSound("bg");

      background();
    }

    function explode() {
      explosion.play();
    }

    function hit() {
      hitted.play();
    }

    function background() {
      bg.loop = true;
      bg.play();
    }

    return {
      init: init,
      explode: explode,
      hit: hit,
      background: background
    };
  }
);