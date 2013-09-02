define(["PIXI", "config", "utils/zeroPad",
    "utils/publisher", "loaders/sprites", "loaders/fonts"
  ],
  function(PIXI, config, zeroPad, publisher, sprites, fonts) {

    var events = publisher,
      aliens = [],
      alienFrames = ["eggHead.png", "flowerTop.png", "helmlok.png", "skully.png"],
      explosionTextures = [],
      assetsLoaded = false,
      spritesLoaded = false,
      fontsLoaded = false,
      width = config.get("width"),
      height = config.get("height"),
      aliensToSpawn = config.get("aliensToSpawn"),
      backgroundTexture,
      cloudTextures = [];

    sprites.events.on("spritesLoaded", onAssetsLoaded);
    sprites.init();

    fonts.events.on("fontsLoaded", onFontsLoaded);
    fonts.init();

    function onFontsLoaded() {
      // font loaded, check other assets...
      console.log("font assets loaded!");
      fontsLoaded = true;
      checkAssetsLoaded();
    }

    function checkAssetsLoaded() {
      if (spritesLoaded === true && fontsLoaded === true) {
        assetsLoaded = true;
        console.log("all assets loaded!");
        events.trigger("assetsLoaded");
      }
    }

    function onAssetsLoaded() {
      var i = 0,
        texture;

      // add explosion textures
      for (i = 0; i < 26; i += 1) {
        texture = getTextureByName("Explosion_Sequence_A " + (i + 1) + ".png");
        explosionTextures.push(texture);
      }

      // add background textures
      backgroundTexture = getTextureByName("bg/0000");

      // add cloud textures
      for (i = 0; i < 25; i += 1) {
        texture = getTextureByName("cloud/" + zeroPad(i, 4));
        cloudTextures.push(texture);
      }

      // sprites loaded, check other assets...
      console.log("sprite assets loaded!");
      spritesLoaded = true;
      checkAssetsLoaded();
    }

    function getTextureByName(name) {
      var textureByName = PIXI.Texture.fromFrame(name);
      return textureByName;
    }

    return {
      aliens: aliens,
      alienFrames: alienFrames,
      assetsLoaded: assetsLoaded,
      events: events,
      explosionTextures: explosionTextures,
      getBackgroundTexture: function() {
        return backgroundTexture;
      },
      cloudTextures: cloudTextures,
      getTextureByName: getTextureByName
    };
  }
);