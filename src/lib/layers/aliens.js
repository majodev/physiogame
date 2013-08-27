define(["display/assets", "display/factory", "config", "displayController",
    "leapController", "utils/hittest", "underscore", "layers/crosshair", "PIXI", "models/score"
  ],
  function(assets, factory, config, displayController,
    leapController, hittest, _, crosshair, PIXI, score) {

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
      alienNormalScaleMin = 0.15,
      alienNormalScaleCap = 0.9,
      alienNormalScaleBeforeCap = 0.02;
      alienNormalScaleAfterCap = 0.003;


    if (assets.assetsLoaded === true) {
      addAliens();
    } else {
      assets.events.on("assetsLoaded", addAliens);
    }

    config.on("change", configChanged);

    function addAliens() {
      var i = 0,
        max = assets.aliens.length;

      aliensArray = assets.aliens;

      for (i; i < max; i += 1) {
        layer.addChild(aliensArray[i]);
      }
    }

    function configChanged(model, options) {
      width = model.get("width");
      height = model.get("height");
    }

    function activate() {
      if (!running) {

        displayController.events.on("renderFrame", onRenderMove);
        leapController.events.on("handFrameNormalized", onHandFrame);
        crosshair.events.on("crosshairActive", onHandFrame);

        running = true;
      }
    }

    function deactivate() {
      if (running) {

        displayController.events.remove("renderFrame", onRenderMove);
        leapController.events.remove("handFrameNormalized", onHandFrame);
        crosshair.events.remove("newCrosshairPosition", onHandFrame);

        running = false;
      }
    }

    function onRenderMove() {
      var i = 0,
        max = aliensArray.length,
        alien;

      for (i; i < max; i += 1) {

        alien = aliensArray[i];

        if (alien.visible === true) {

          if (alien.position.x < alien.targetX) {
            alien.position.x += alien.speed;
          }
          if (alien.position.x > alien.targetX) {
            alien.position.x -= alien.speed;
          }
          if (alien.position.y < alien.targetY) {
            alien.position.y += alien.speed;
          }
          if (alien.position.y > alien.targetY) {
            alien.position.y -= alien.speed;
          }
          if (alien.position.x === alien.targetX) {
            alien.targetX = parseInt(Math.random() * width, 10);
          }
          if (alien.position.y === alien.targetY) {
            alien.targetY = parseInt(Math.random() * height, 10);
          }

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
            if (alien.speed <= alienHittedSpeedMax) {
              alien.speed += alienHittedSpeedStep;
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

            if (alien.speed > 1) {
              alien.speed -= 1;
            }
          }

          if (alien.scale.x > 1.8) { // boom
            alien.visible = false;

            var explosion = new PIXI.MovieClip(assets.explosionTextures);

            explosion.position.x = aliensArray[i].position.x;
            explosion.position.y = aliensArray[i].position.y;
            explosion.anchor.x = 0.5;
            explosion.anchor.y = 0.5;

            explosion.rotation = Math.random() * Math.PI;
            explosion.scale.x = explosion.scale.y = 0.75 + Math.random() * 0.5;

            explosion.loop = false;
            explosion.gotoAndPlay(0);


            layer.addChild(explosion);

            score.raiseScore();

          }

        }

      }
    }

    function onHandFrame(coordinates) {
      var i = 0,
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
          aliensArray[i].hitted = hittest(aliensArray[i], hitCord);
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