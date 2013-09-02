define(["loaders/sounds"],
  function(sounds) {

    sounds.events.on("soundsLoaded", onSoundsLoaded);
    sounds.init();

    // important! it's essential to include ogg at first, as node-webkit falsely
    // reports back mp3 support even when libmpegsumo for decoding isn't included

    function onSoundsLoaded() {
      console.log("soundController: soundsloaded!");
    }

    function explode() {
      sounds.getSound("explosion").play();
    }

    function hit() {
      sounds.getSound("hitted").play();
    }

    return {
      explode: explode,
      hit: hit
    };
  }
);