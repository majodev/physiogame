define(["log", "PIXI", "config", "utils/publisher"],
  function(log, PIXI, config, publisher) {

    var events = publisher.make(),
      pixiSpriteLoader = new PIXI.AssetLoader(config.get("spriteSheets")),
      spriteSheetsLoaded = false,
      spritesSheetLoadedCount = 0,
      spritesSheetToLoadLength = config.get("spriteSheets").length;

    // set callback to fire after pixiSpriteLoader is complete
    pixiSpriteLoader.onComplete = onSpriteSheetsLoaded;
    pixiSpriteLoader.onProgress = onSpriteSheetProgress;

    function init() {
      if (spriteSheetsLoaded === false) {
        // begin loading of spritesheets
        pixiSpriteLoader.load();
      }
    }

    function onSpriteSheetsLoaded() {
      log.debug("spritesheets loaded");
      spriteSheetsLoaded = true;
      events.trigger("allSpritesLoaded");
    }

    function onSpriteSheetProgress() {
      spritesSheetLoadedCount += 1;
      log.debug("spritesheet loaded: " + spritesSheetLoadedCount + " of " + spritesSheetToLoadLength);
    }

    return {
      init: init,
      events: events
    };

  }
);