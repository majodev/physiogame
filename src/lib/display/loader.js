define(["PIXI", "utils/eventPublisher", "config"],
  function(PIXI, eventPublisher, config) {

    var events = eventPublisher(["loaderComplete"]),
      loader = new PIXI.AssetLoader(config.get("spriteSheets")),
      spriteSheetsLoaded = false;

    // set callback to fire after loader is complete
    loader.onComplete = onSpriteSheetsLoaded;

    function init() {
      // begin loading of spritesheets
      loader.load();
    }

    function onSpriteSheetsLoaded() {
      spriteSheetsLoaded = true;
      events.fire("loaderComplete");
    }

    return {
      events: events,
      init: init
    };

  }
);