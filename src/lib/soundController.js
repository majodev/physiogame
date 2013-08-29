define(["Howler"],
  function(Howler) {

    // important! it's essential to include ogg at first, as node-webkit falsely
    // reports back mp3 support even when libmpegsumo for decoding isn't included

    var explosion = new Howler.Howl({
      urls: ["assets/sound/explosion.ogg", "assets/sound/explosion.mp3", "assets/sound/explosion.wav"],
      autoplay: false,
      loop: false,
      volume: 0.7,
    });

    var hitted = new Howler.Howl({
      urls: ["assets/sound/hitted.ogg", "assets/sound/hitted.mp3", "assets/sound/hitted.wav"],
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