define(["PIXI", "utils/eventPublisher", "config", "display/loader", "utils/zeroPad"],
  function(PIXI, eventPublisher, config, loader, zeroPad) {

    var events = eventPublisher(["assetsLoaded"]),
      aliens = [],
      alienFrames = ["eggHead.png", "flowerTop.png", "helmlok.png", "skully.png"],
      explosionTextures = [],
      assetsLoaded = false,
      width = config.get("width"),
      height = config.get("height"),
      aliensToSpawn = config.get("aliensToSpawn"),
      backgroundTexture,
      cloudTextures = [];

    loader.events.on("loaderComplete", onAssetsLoaded);
    loader.init();

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

      // show subscipers that we are finish loading our assets
      assetsLoaded = true;
      console.log("display: assets loaded!");
      events.fire("assetsLoaded");
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
      getBackgroundTexture: function () {
        return backgroundTexture;
      },
      cloudTextures: cloudTextures,
      getTextureByName : getTextureByName
    };
  }
);