define(["log", "utils/publisher", "loaders/fonts", "loaders/sounds", "loaders/sprites"],
  function(log, publisher, fonts, sounds, sprites) {

    var spritesLoaded = false,
      fontsLoaded = false,
      soundsLoaded = false,
      events = publisher.make();

    function init() {
      log.debug("preloader: init");

      sprites.events.on("allSpritesLoaded", onSpritesLoaded);
      fonts.events.on("allFontsLoaded", onFontsLoaded);
      sounds.events.on("allSoundsLoaded", onSoundsLoaded);

      sprites.init();
      fonts.init();
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

        sprites.events.off("allSpritesLoaded", onSpritesLoaded);
        fonts.events.off("allFontsLoaded", onFontsLoaded);
        sounds.events.off("allSoundsLoaded", onSoundsLoaded);

        events.trigger("preloadedAll");
      }
    }

    return {
      events: events,
      init: init
    };

  }
);