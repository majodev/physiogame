define(["PIXI", "appConfig", "utils/zeroPad", "log"],
  function(PIXI, appConfig, zeroPad, log) {

    var atlas = {
        background: undefined,
        crosshair: undefined,
        aliens: [],
        explosions: [],
        popExplosions: [],
        clouds: [],
        buttonBGs: [],
        balloons: [],
        fhjoanneumlogo: undefined,
        majodevicon: undefined,
        leapNoHand: undefined,
        leapOutside: undefined
      };

    // will be called when all preloading of pictures and json has finished!

    function init() {

      log.debug("textures: creating atlas...");

      // add background texture
      atlas.background = getTextureByName("bg/0000");

      // add crosshair
      atlas.crosshair = getTextureByName("assets/sprites/crosshair.png");

      // add fh joanneum logo
      atlas.fhjoanneumlogo = getTextureByName("assets/sprites/fh-joanneum-logo.png");

      // add fh joanneum logo
      atlas.majodevicon = getTextureByName("assets/sprites/majodev-icon.png");

      // leaps
      atlas.leapNoHand = getTextureByName("leap-nohand.png");
      atlas.leapOutside = getTextureByName("leap-outside.png");

      // add alien textures
      parseTexturesByNames(atlas.aliens, [
        "eggHead.png", "flowerTop.png", "helmlok.png", "skully.png"]);

      // add explosion textures
      parseTextures(atlas.explosions, "Explosion_Sequence_A ", ".png", 1, 27, false);

      // add pop explosion textures
      parseTextures(atlas.popExplosions, "pop_mv", ".png", 1, 27, true, 4);

      // add cloud textures
      parseTextures(atlas.clouds, "cloud/", "", 0, 24, true, 4);

      // add buttonBG textures
      parseTextures(atlas.buttonBGs, "ButtonBG", "", 0, 3, true, 4);

      // add balloon textures
      parseTextures(atlas.balloons, "ballMC", "", 0, 5, true, 4);

      log.debug("textures: atlas created!");
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

    return {
      init: init,
      getTextureByName: getTextureByName,
      atlas: atlas
    };
  }
);