define(["Howler"],
  function(Howler) {

    var explosion = new Howler.Howl({
      urls: ['assets/sound/explosion.mp3', 'explosion.ogg', 'explosion.wav'],
      autoplay: false,
      loop: false,
      volume: 0.7,
    });

    var hitted = new Howler.Howl({
      urls: ['assets/sound/hitted.mp3', 'hitted.ogg', 'hitted.wav'],
      autoplay: false,
      loop: false,
      volume: 0.03,
    });

    function explode() {
      explosion.play();
    }

    function hit() {
      hitted.play();
    }

    return {
      explode: explode,
      hit: hit
    };

  }

);