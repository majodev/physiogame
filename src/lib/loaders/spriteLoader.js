define(["log", "PIXI", "appConfig", "utils/publisher", "display/textures",
  "loaders/status"],
  function(log, PIXI, appConfig, publisher, textures,
    status) {

    var events = publisher.make(),
      pixiSpriteLoader = new PIXI.AssetLoader(appConfig.get("images")),
      spriteSheetsLoaded = false,
      spritesSheetLoadedCount = 0,
      spritesSheetToLoadLength = appConfig.get("images").length;

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

      // create the texture atlas when its finished loading images!
      textures.init();

      events.trigger("allSpritesLoaded");
    }

    function onSpriteSheetProgress() {
      spritesSheetLoadedCount += 1;

      status.write("sprites: loaded " + spritesSheetLoadedCount + " of " + spritesSheetToLoadLength);

      log.debug("spritesheet loaded: " + spritesSheetLoadedCount + " of " + spritesSheetToLoadLength);
    }

    return {
      init: init,
      events: events
    };

  }
);