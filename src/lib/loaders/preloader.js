define(["log", "utils/publisher",
  "loaders/fontLoader", "loaders/soundLoader", "loaders/spriteLoader",
  "loaders/status"],
  function(log, publisher,
    fontLoader, soundLoader, spriteLoader,
    status) {

    var spritesloaded = false,
      fontsloaded = false,
      soundsloaded = false,
      events = publisher.make();

    function init() {
      log.debug("preloader: init");

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
      //status.write("all sprites loaded!");
      checkAllLoaded();
    }

    function onSoundsLoaded() {
      log.debug("preloader: preloadedSounds");
      soundsloaded = true;
      events.trigger("preloadedSounds");
      //status.write("all sounds loaded!");
      checkAllLoaded();
    }

    function onFontsLoaded() {
      log.debug("preloader: preloadedFonts");
      fontsloaded = true;
      events.trigger("preloadedFonts");
      //status.write("all fonts loaded!");
      checkAllLoaded();
    }

    function checkAllLoaded() {
      if (spritesloaded && fontsloaded && soundsloaded) {
        log.debug("preloader: preloadedAll");

        spriteLoader.events.off("allSpritesLoaded", onSpritesLoaded);
        fontLoader.events.off("allFontsLoaded", onFontsLoaded);
        soundLoader.events.off("allSoundsLoaded", onSoundsLoaded);

        events.trigger("preloadedAll");
      }
    }

    return {
      events: events,
      init: init
    };

  }
);