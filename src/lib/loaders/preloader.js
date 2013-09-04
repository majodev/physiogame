define(["log", "utils/publisher", "loaders/indicator",
  "loaders/fontLoader", "loaders/soundLoader", "loaders/spriteLoader"],
  function(log, publisher, indicator,
    fontLoader, soundLoader, spriteLoader) {

    var spritesloaded = false,
      fontsloaded = false,
      soundsloaded = false,
      events = publisher.make();

    function init() {
      log.debug("preloader: init");

      indicator.enable();

      spriteLoader.events.on("allSpritesLoaded", onSpritesLoaded);
      fontLoader.events.on("allFontsLoaded", onFontsLoaded);
      soundLoader.events.on("allSoundsLoaded", onSoundsLoaded);

      spriteLoader.init();
      fontLoader.init();
      soundLoader.init();
    }

    function onSpritesLoaded() {
      log.debug("preloader: preloadedSprites");
      spritesloaded = true;
      events.trigger("preloadedSprites");
      checkAllLoaded();
    }

    function onSoundsLoaded() {
      log.debug("preloader: preloadedSounds");
      soundsloaded = true;
      events.trigger("preloadedSounds");
      checkAllLoaded();
    }

    function onFontsLoaded() {
      log.debug("preloader: preloadedFonts");
      fontsloaded = true;
      events.trigger("preloadedFonts");
      checkAllLoaded();
    }

    function checkAllLoaded() {
      if (spritesloaded && fontsloaded && soundsloaded) {
        log.debug("preloader: preloadedAll");

        spriteLoader.events.off("allSpritesLoaded", onSpritesLoaded);
        fontLoader.events.off("allFontsLoaded", onFontsLoaded);
        soundLoader.events.off("allSoundsLoaded", onSoundsLoaded);

        indicator.disable();

        events.trigger("preloadedAll");
      }
    }

    return {
      events: events,
      init: init
    };

  }
);