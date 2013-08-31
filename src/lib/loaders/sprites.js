define(["PIXI", "config", "Backbone", "underscore"],
  function(PIXI, config, Backbone, _) {

    var events = _.clone(Backbone.Events),
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

    function getSpriteSheetsLoaded() {
      return spriteSheetsLoaded;
    }

    function onSpriteSheetsLoaded() {
      spriteSheetsLoaded = true;
      events.trigger("spritesLoaded");
    }

    return {
      init: init,
      getSpriteSheetsLoaded: getSpriteSheetsLoaded,
      events: events
    };

  }
);