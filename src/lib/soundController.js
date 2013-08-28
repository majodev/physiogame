define(["Howler"],
  function(Howler) {
    var sound = new Howler.Howl({
      urls: ['assets/sound/explosion.mp3', 'explosion.ogg', 'explosion.wav'],
      autoplay: false,
      loop: false,
      volume: 1,
    });

    function explosion() {
      sound.play();
    }

    return {
      explosion: explosion
    };

  }

);