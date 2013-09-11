define(["display/textures", "display/factory", "config", "base/displayManager",
    "base/leapManager", "utils/hittest", "underscore", "layers/crosshair", "PIXI",
    "entities/scoreEntity", "base/soundManager", "systems/randomMoveTo"
  ],
  function(textures, factory, config, displayManager,
    leapManager, hittest, _, crosshair, PIXI, scoreEntity, soundManager, randomMoveTo) {

    var width = config.get("width"),
      height = config.get("height"),
      running = false,
      layer = factory.makeLayer(),
      aliensArray = [],
      alienHittedScaleCap = 1,
      alienHittedScaleBeforeCap = 0.12,
      alienHittedScaleAfterCap = 0.08,
      alienHittedSpeedMax = 5,
      alienHittedSpeedStep = 1,
      alienHittedAlphaStep = 0.2,
      alienNormalScaleMin = 0.25,
      alienNormalScaleCap = 0.9,
      alienNormalScaleBeforeCap = 0.02,
      alienNormalScaleAfterCap = 0.003,
      explosionsClearing = [];


    function createAliens() {

      var aliensToSpawn = config.get("aliensToSpawn"),
        i = 0,
        frameName,
        asien;
      // add aliens...
      for (i = 0; i < aliensToSpawn; i += 1) {
        frameName = textures.alienFrames[i % 4];

        // create an alien using the frame name..
        alien = factory.makePIXISprite(textures.getTextureByName(frameName));

        // components...
        randomMoveTo.init(alien);

        // set its initial values...
        alien.position.x = parseInt(Math.random() * width, 10);
        alien.position.y = parseInt(Math.random() * height, 10);
        alien.anchor.x = 0.5;
        alien.anchor.y = 0.5;
        alien.scale.x = 0.2;
        alien.scale.y = 0.2;
        alien.hitted = false; // extra
        alien.alpha = 0.5;

        aliensArray.push(alien);
        layer.addChild(aliensArray[i]);
      }
    }

    function configChanged(model, options) {
      width = model.get("width");
      height = model.get("height");
    }

    function activate() {
      if (!running) {

        config.on("change", configChanged);
        width = config.get("width");
        height = config.get("height");

        if (aliensArray.length < 1) {
          createAliens();
        }

        displayManager.events.on("renderFrame", onRenderMove);
        displayManager.events.on("renderFrame", onRenderClearExplosions);
        leapManager.events.on("handFrameNormalized", onHandFrame);
        crosshair.events.on("crosshairActive", onHandFrame);

        running = true;
      }
    }

    function deactivate() {
      var i = 0,
          len = aliensArray.length;
      if (running) {

        config.off("change", configChanged);

        displayManager.events.off("renderFrame", onRenderMove);
        displayManager.events.off("renderFrame", onRenderClearExplosions);
        leapManager.events.off("handFrameNormalized", onHandFrame);
        crosshair.events.off("crosshairActive", onHandFrame);

        running = false;

        for (i = 0; i < len; i += 1) {
          layer.removeChild(aliensArray[i]);
        }

        aliensArray = [];
      }
    }

    function onRenderClearExplosions() {
      var i = 0,
        length = explosionsClearing.length;
      for (i; i < length; i += 1) {
        if(explosionsClearing[i].alpha > 0) {
          explosionsClearing[i].alpha -= 0.01;
        } else {
          layer.removeChild(explosionsClearing.splice(i, 1)[0]);
          i -= 1;
          length -= 1;
        }
      }
    }

    function onRenderMove() {
      var i = 0,
        max = aliensArray.length,
        alien;

      for (i; i < max; i += 1) {

        alien = aliensArray[i];

        if (alien.visible === true) {

          randomMoveTo.update(alien);




          if (alien.hitted === true) {
            if (alien.scale.x < alienHittedScaleCap) {
              alien.scale.x += alienHittedScaleBeforeCap;
              alien.scale.y += alienHittedScaleBeforeCap;
            } else {
              alien.scale.x += alienHittedScaleAfterCap;
              alien.scale.y += alienHittedScaleAfterCap;
            }
            if (alien.alpha < 1) {
              alien.alpha += alienHittedAlphaStep;
            }
            if (alien.speed.x <= alienHittedSpeedMax) {
              alien.speed.x += alienHittedSpeedStep;
              alien.speed.y += alienHittedSpeedStep;
            }

          } else {
            if (alien.scale.x > alienNormalScaleMin) {
              if (alien.scale.x > alienNormalScaleCap) {
                alien.scale.x -= alienNormalScaleBeforeCap;
                alien.scale.y -= alienNormalScaleBeforeCap;
              } else {
                alien.scale.x -= alienNormalScaleAfterCap;
                alien.scale.y -= alienNormalScaleAfterCap;
              }

            }
            if (alien.alpha > 0.5) {
              alien.alpha -= 0.01;
            }

            if (alien.speed.x > 1) {
              alien.speed.x -= 1;
              alien.speed.y -= 1;
            }
          }

          if (alien.scale.x > 1.8) { // boom
            alien.visible = false;

            var explosion = new PIXI.MovieClip(textures.explosionTextures);

            explosion.position.x = aliensArray[i].position.x;
            explosion.position.y = aliensArray[i].position.y;
            explosion.anchor.x = 0.5;
            explosion.anchor.y = 0.5;

            explosion.rotation = Math.random() * Math.PI;
            explosion.scale.x = explosion.scale.y = 0.75 + Math.random() * 0.5;

            explosion.loop = false;
            explosion.gotoAndPlay(0);

            soundManager.explode();

            explosion.onComplete = onExplosionComplete;


            layer.addChild(explosion);

            scoreEntity.raiseScore();
          }
        }

      }
    }

    function onExplosionComplete() {
      explosionsClearing.push(this);
    }

    function onHandFrame(coordinates) {
      var i = 0,
        hitted = false,
        max = aliensArray.length,
        hitCord = _.extend(coordinates, {
          width: 20,
          height: 20,
          anchor: {
            x: 0.5,
            y: 0.5
          }
        });

      for (i; i < max; i += 1) {
        if (aliensArray[i].visible === true) {
          hitted = hittest(aliensArray[i], hitCord);
          if (aliensArray[i].hitted !== hitted) {
            soundManager.hit();
          }
          aliensArray[i].hitted = hitted;
        }
      }
    }

    return {
      activate: activate,
      deactivate: deactivate,
      getRunning: function() {
        return running;
      },
      getLayer: function() {
        return layer;
      }
    };
  }
);