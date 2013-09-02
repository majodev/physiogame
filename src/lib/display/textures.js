define(["PIXI", "config", "utils/zeroPad", "loaders/sprites"
  ],
  function(PIXI, config, zeroPad, sprites) {

    var aliens = [],
      alienFrames = ["eggHead.png", "flowerTop.png", "helmlok.png", "skully.png"],
      explosionTextures = [],
      width = config.get("width"),
      height = config.get("height"),
      aliensToSpawn = config.get("aliensToSpawn"),
      backgroundTexture,
      cloudTextures = [];

    function init() {
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
    }

    function getTextureByName(name) {
      var textureByName = PIXI.Texture.fromFrame(name);
      return textureByName;
    }

    return {
      init: init,
      aliens: aliens,
      alienFrames: alienFrames,
      explosionTextures: explosionTextures,
      getBackgroundTexture: function() {
        return backgroundTexture;
      },
      cloudTextures: cloudTextures,
      getTextureByName: getTextureByName
    };
  }
);