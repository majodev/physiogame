define(["PIXI", "config", "utils/zeroPad", "loaders/spriteLoader"],
  function(PIXI, config, zeroPad, spriteLoader) {

    var atlas = {
        background: undefined,
        crosshair: undefined,
        aliens: [],
        explosions: [],
        clouds: [],
        buttonBGs: [],
        balloons: []
      };

    // will be called when all preloading of pictures and json has finished!

    function init() {

      // add background texture
      atlas.background = getTextureByName("bg/0000");

      // add crosshair
      //atlas.crosshair = getTextureByImageID("assets/crosshair.png");

      // add alien textures
      parseTexturesByNames(atlas.aliens, [
        "eggHead.png", "flowerTop.png", "helmlok.png", "skully.png"]);

      // add explosion textures
      parseTextures(atlas.explosions, "Explosion_Sequence_A ", ".png", 1, 26, false);

      // add cloud textures
      parseTextures(atlas.clouds, "cloud/", "", 0, 24, true, 4);

      // add buttonBG textures
      parseTextures(atlas.buttonBGs, "ButtonBG", "", 0, 3, true, 4);

      // add balloon textures
      parseTextures(atlas.balloons, "ballMC", "", 0, 5, true, 4);
    }

    function parseTexturesByNames(atlasArray, textureNames) {
      var i = 0,
        len = textureNames.length;
      for (i; i < len; i += 1) {
        atlasArray.push(getTextureByName(textureNames[i]));
      }
    }

    function parseTextures(atlasArray, prefix, postfix, firstIndex, lastIndex, pad, padLength) {
      var i = firstIndex,
        len = lastIndex,
        texture;

      for (i; i <= len; i += 1) {
        if (pad === false) {
          texture = getTextureByName(prefix + i + postfix);
        } else {
          texture = getTextureByName(prefix + zeroPad(i, padLength) + postfix);
        }
        atlasArray.push(texture);
      }
    }

    function getTextureByName(name) {
      var textureByName = PIXI.Texture.fromFrame(name);
      return textureByName;
    }

    function getTextureByImageID(id) {
      var textureByImageID = PIXI.Texture.fromFrameId(id);
      return textureByImageID;
    }

    return {
      init: init,
      getTextureByName: getTextureByName,
      atlas: atlas
    };
  }
);