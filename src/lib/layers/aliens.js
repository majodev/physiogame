define(["display/assets", "display/factory", "config", "displayController",
    "leapController", "utils/hittest", "utils/mixin", "layers/crosshair"
  ],
  function(assets, factory, config, displayController,
    leapController, hittest, mixin, crosshair) {

    var width = config.width,
      height = config.height,
      running = false,
      layer = factory.makeLayer(),
      aliensArray = [];


    if (assets.assetsLoaded === true) {
      addAliens();
    } else {
      assets.events.on("assetsLoaded", addAliens);
    }

    function addAliens() {
      var i = 0,
        max = assets.aliens.length;

      aliensArray = assets.aliens;

      for (i; i < max; i += 1) {
        layer.addChild(aliensArray[i]);
      }
    }

    function init() {
      if (!running) {

        displayController.events.on("renderFrame", onRenderMove);
        leapController.events.on("handFrameNormalized", onHandFrame);
        crosshair.events.on("crosshairActive", onHandFrame);

        running = true;
      }
    }

    function kill() {
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
            alien.targetX = parseInt(Math.random() * config.width, 10);
          }
          if (alien.position.y === alien.targetY) {
            alien.targetY = parseInt(Math.random() * config.height, 10);
          }

          if (alien.hitted === true) {
            if (alien.scale.x < 2) {
              alien.scale.x += 0.02;
              alien.scale.y += 0.02;
            }
            if (alien.alpha < 1) {
              alien.alpha += 0.1;
            }
            if (alien.speed < 6) {
              alien.speed += 1;
            }

          } else {
            if (alien.scale.x > 0.15) {
              if (alien.scale.x > 0.6) {
                alien.scale.x -= 0.02;
                alien.scale.y -= 0.02;
              } else {
                alien.scale.x -= 0.003;
                alien.scale.y -= 0.003;
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

          }

        }

      }
    }

    function onHandFrame(coordinates) {
      var i = 0,
        max = aliensArray.length,
        hitCord = mixin(coordinates, {
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
      activate: function() {
        init();
      },
      deactivate: function() {
        kill();
      },
      getRunning: function() {
        return running;
      },
      getLayer: function() {
        return layer;
      }
    };
  }
);