define(["log", "PIXI", "config", "utils/publisher"],
  function(log, PIXI, config, publisher) {

    var events = publisher.make(),
      pixiSpriteLoader = new PIXI.AssetLoader(config.get("spriteSheets")),
      spriteSheetsLoaded = false;

    // set callback to fire after pixiSpriteLoader is complete
    pixiSpriteLoader.onComplete = onSpriteSheetsLoaded;

    function init() {
      if (spriteSheetsLoaded === false) {
        // begin loading of spritesheets
        pixiSpriteLoader.load();
      }
    }

    function onSpriteSheetsLoaded() {
      log.debug("spritesheets loaded");
      spriteSheetsLoaded = true;
      events.trigger("spritesLoaded");
    }

    return {
      init: init,
      events: events
    };

  }
);