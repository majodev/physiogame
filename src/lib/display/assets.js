define(["PIXI", "utils/eventPublisher", "config", "display/loader"],
  function(PIXI, eventPublisher, config, loader) {

    var events = eventPublisher(["assetsLoaded"]),
      aliens = [],
      alienFrames = ["eggHead.png", "flowerTop.png", "helmlok.png", "skully.png"],
      explosionTextures = [],
      assetsLoaded = false;

    loader.events.on("loaderComplete", onAssetsLoaded);
    loader.init();

    function onAssetsLoaded() {
      var i = 0,
        frameName,
        alien;

      // add aliens...
      for (i; i < 100; i += 1) {
        frameName = alienFrames[i % 4];

        // create an alien using the frame name..
        alien = PIXI.Sprite.fromFrame(frameName);

        // set its initial values...
        alien.position.x = parseInt(Math.random() * config.width, 10);
        alien.position.y = parseInt(Math.random() * config.height, 10);
        alien.targetX = parseInt(Math.random() * config.width, 10); // extra
        alien.targetY = parseInt(Math.random() * config.height, 10); // extra
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
        var texture = PIXI.Texture.fromFrame("Explosion_Sequence_A " + (i + 1) + ".png");
        explosionTextures.push(texture);
      }

      assetsLoaded = true;
      events.fire("assetsLoaded");
    }

    return {
      aliens: aliens,
      assetsLoaded: assetsLoaded,
      events: events,
      explosionTextures: explosionTextures
    };
  }
);