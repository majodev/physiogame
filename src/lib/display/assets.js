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
        frameName,
        alien,
        texture;

      // add aliens...
      for (i; i < aliensToSpawn; i += 1) {
        frameName = alienFrames[i % 4];

        // create an alien using the frame name..
        alien = PIXI.Sprite.fromFrame(frameName);

        // set its initial values...
        alien.position.x = parseInt(Math.random() * width, 10);
        alien.position.y = parseInt(Math.random() * height, 10);
        alien.targetX = parseInt(Math.random() * width, 10); // extra
        alien.targetY = parseInt(Math.random() * height, 10); // extra
        alien.anchor.x = 0.5;
        alien.anchor.y = 0.5;
        alien.scale.x = 0.2;
        alien.scale.y = 0.2;
        alien.hitted = false; // extra
        alien.alpha = 0.5;
        alien.speed = 1; // extra

        aliens.push(alien);
      }

      // add explosion textures
      for (i = 0; i < 26; i += 1) {
        texture = PIXI.Texture.fromFrame("Explosion_Sequence_A " + (i + 1) + ".png");
        explosionTextures.push(texture);
      }

      // add background textures
      backgroundTexture = PIXI.Texture.fromFrame("bg/0000");

      // add cloud textures
      for (i = 0; i < 25; i += 1) {
        texture = PIXI.Texture.fromFrame("cloud/" + zeroPad(i, 4));
        cloudTextures.push(texture);
      }

      // show subscipers that we are finish loading our assets
      assetsLoaded = true;
      console.log("display: assets loaded!");
      events.fire("assetsLoaded");
    }

    return {
      aliens: aliens,
      assetsLoaded: assetsLoaded,
      events: events,
      explosionTextures: explosionTextures,
      getBackgroundTexture: function () {
        return backgroundTexture;
      },
      cloudTextures: cloudTextures
    };
  }
);