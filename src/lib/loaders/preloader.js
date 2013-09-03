define(["log", "utils/publisher", "loaders/fonts", "loaders/sounds", "loaders/sprites"],
  function(log, publisher, fonts, sounds, sprites) {

    var spritesLoaded = false,
      fontsLoaded = false,
      soundsLoaded = false,
      events = publisher.make();

    function init() {
      log.debug("preloader: init");
      sprites.events.on("spritesLoaded", onSpritesLoaded);
      sprites.init();

      fonts.events.on("fontsLoaded", onFontsLoaded);
      fonts.init();

      sounds.events.on("soundsLoaded", onSoundsLoaded);
      sounds.init();
    }

    function onSpritesLoaded() {
      log.debug("preloader: preloadedSprites");
      spritesLoaded = true;
      events.trigger("preloadedSprites");
      checkAllLoaded();
    }

    function onSoundsLoaded() {
      log.debug("preloader: preloadedSounds");
      soundsLoaded = true;
      events.trigger("preloadedSounds");
      checkAllLoaded();
    }

    function onFontsLoaded() {
      log.debug("preloader: preloadedFonts");
      fontsLoaded = true;
      events.trigger("preloadedFonts");
      checkAllLoaded();
    }

    function checkAllLoaded() {
      if (spritesLoaded && fontsLoaded && soundsLoaded) {
        log.debug("preloader: preloadedAll");
        events.trigger("preloadedAll");
      }
    }

    return {
      events: events,
      init: init
    };

  }
);