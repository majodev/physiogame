define(["PIXI", "utils/eventPublisher", "config"],
  function(PIXI, eventPublisher, config) {

    var events = eventPublisher(["assetsLoaded"]);


    var assetsToLoader = ["assets/SpriteSheetAliens.json", "assets/SpriteSheetExplosion.json"];
    var aliens = [];
    var alienFrames = ["eggHead.png", "flowerTop.png", "helmlok.png", "skully.png"];

    var explosionTextures = [];

    var assetsLoaded = false;

    loader = new PIXI.AssetLoader(assetsToLoader);

    // use callback
    loader.onComplete = onAssetsLoaded;

    // begin load
    loader.load();

    function onAssetsLoaded() {
      var i = 0,
        frameName,
        alien;

      // add aliens...
      for (i; i < 175; i += 1) {
        frameName = alienFrames[i % 4];

        // create an alien using the frame name..
        alien = PIXI.Sprite.fromFrame(frameName);

        /*
         * fun fact for the day :)
         * another way of doing the above would be
         * var texture = PIXI.Texture.fromFrame(frameName);
         * var alien = new PIXI.Sprite(texture);
         */

        alien.position.x = parseInt(Math.random() * config.width, 10);
        alien.position.y = parseInt(Math.random() * config.height, 10);
        alien.targetX = parseInt(Math.random() * config.width, 10);
        alien.targetY = parseInt(Math.random() * config.height, 10);
        alien.anchor.x = 0.5;
        alien.anchor.y = 0.5;
        alien.scale.x = 0.2;
        alien.scale.y = 0.2;
        alien.hitted = false;
        alien.alpha = 0.1;

        alien.speed = 1;

        aliens.push(alien);
        //alienContainer.addChild(alien);
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