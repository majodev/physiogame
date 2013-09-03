define(["log", "loaders/sounds"],
  function(log, sounds) {

    var explosion,
      hitted;

    function init() {
      log.debug("soundController: init");
      explosion = sounds.getSound("explosion");
      hitted = sounds.getSound("hitted");
    }

    function explode() {
      explosion.play();
    }

    function hit() {
      hitted.play();
    }

    return {
      init: init,
      explode: explode,
      hit: hit
    };
  }
);