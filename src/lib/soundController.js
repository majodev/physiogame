define(["loaders/sounds"],
  function(sounds) {

    var explosion,
      hitted;

    function init() {
      console.log("soundController: init");
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