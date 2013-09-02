define(["utils/publisher", "loaders/fonts", "loaders/sounds", "loaders/sprites"],
  function(publisher, fonts, sounds, sprites) {

    var spritesLoaded = false,
      fontsLoaded = false,
      soundsLoaded = false,
      events = publisher.make();

    function init() {
      console.log("preloader: init");
      sprites.events.on("spritesLoaded", onSpritesLoaded);
      sprites.init();

      fonts.events.on("fontsLoaded", onFontsLoaded);
      fonts.init();

      sounds.events.on("soundsLoaded", onSoundsLoaded);
      sounds.init();
    }

    function onSpritesLoaded() {
      console.log("preloader: preloadedSprites");
      spritesLoaded = true;
      events.trigger("preloadedSprites");
      checkAllLoaded();
    }

    function onSoundsLoaded() {
      console.log("preloader: preloadedSounds");
      soundsLoaded = true;
      events.trigger("preloadedSounds");
      checkAllLoaded();
    }

    function onFontsLoaded() {
      console.log("preloader: preloadedFonts");
      fontsLoaded = true;
      events.trigger("preloadedFonts");
      checkAllLoaded();
    }

    function checkAllLoaded() {
      if (spritesLoaded && fontsLoaded && soundsLoaded) {
        console.log("preloader: preloadedAll");
        events.trigger("preloadedAll");
      }
    }

    return {
      events: events,
      init: init
    };

  }
);