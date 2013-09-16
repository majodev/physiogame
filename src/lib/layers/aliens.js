define(["display/textures", "gameConfig", "utils/hittest", "underscore", "PIXI",
    "entities/scoreEntity", "base/soundManager", "gameObjects/crosshairGO", "classes/Layer"
  ],
  function(textures, gameConfig, hittest, _, PIXI, scoreEntity, soundManager, crosshairGO, Layer) {

    var layer = new Layer({
      listeners: {
        render: true,
        leap: true
      }
    });

    var objectsArray = [],
      killAnimationsToRemove = [],
      objectHittedScaleCap,
      objectHittedScaleBeforeCap,
      objectHittedScaleAfterCap,
      objectHittedSpeedMax,
      objectHittedSpeedStep,
      objectNormalAlphaMin,
      objectHittedAlphaStep,
      objectNormalAlphaStep,
      objectNormalScaleMin,
      objectNormalScaleCap,
      objectNormalScaleBeforeCap,
      objectNormalScaleAfterCap,
      objectNormalSpeedMin;
      

    layer.onActivate = function() {

      objectHittedScaleCap = gameConfig.get("objectHittedScaleCap");
      objectHittedScaleBeforeCap = gameConfig.get("objectHittedScaleBeforeCap");
      objectHittedScaleAfterCap = gameConfig.get("objectHittedScaleAfterCap");
      objectHittedSpeedMax = gameConfig.get("objectHittedSpeedMax");
      objectHittedSpeedStep = gameConfig.get("objectHittedSpeedStep");
      objectHittedAlphaStep = gameConfig.get("objectHittedAlphaStep");
      objectNormalScaleMin = gameConfig.get("objectNormalScaleMin");
      objectNormalScaleCap = gameConfig.get("objectNormalScaleCap");
      objectNormalScaleBeforeCap = gameConfig.get("objectNormalScaleBeforeCap");
      objectNormalScaleAfterCap = gameConfig.get("objectNormalScaleAfterCap");
      objectNormalAlphaMin = gameConfig.get("objectNormalAlphaMin");
      objectNormalAlphaStep = gameConfig.get("objectNormalAlphaStep");
      objectNormalSpeedMin = gameConfig.get("objectNormalSpeedMin");

      createAliens();

      crosshairGO.events.on("crosshairActive", detectCrosshairHitsAlien);
    };

    layer.onDeactivate = function() {
      crosshairGO.events.off("crosshairActive", detectCrosshairHitsAlien);

      objectsArray = [];
      killAnimationsToRemove = [];
    };

    layer.onRender = function() {
      onRenderMove();
      onRenderClearExplosions();
    };

    layer.onHandFrame = function(coordinates) {
      detectCrosshairHitsAlien(coordinates);
    };

    function detectCrosshairHitsAlien(coordinates) {
      var i = 0,
        hitted = false,
        max = objectsArray.length,
        hitCord = _.extend(coordinates, {
          width: 20,
          height: 20,
          anchor: {
            x: 0.5,
            y: 0.5
          }
        });

      for (i; i < max; i += 1) {
        if (objectsArray[i].visible === true) {
          hitted = hittest(objectsArray[i], hitCord);
          if (objectsArray[i].hitted !== hitted) {
            soundManager.hit();
          }
          objectsArray[i].hitted = hitted;
        }
      }
    }


    function createAliens() {

      var objectsToSpawn = gameConfig.get("objectsToSpawn"),
        i = 0,
        asien;
      // add aliens...
      for (i = 0; i < objectsToSpawn; i += 1) {

        alien = new PIXI.Sprite(textures.atlas.aliens[i % 4]);

        // set its initial values...
        alien.position.x = parseInt(Math.random() * layer.width, 10);
        alien.position.y = parseInt(Math.random() * layer.height, 10);
        alien.targetX = parseInt(Math.random() * layer.width, 10); // extra
        alien.targetY = parseInt(Math.random() * layer.height, 10); // extra
        alien.anchor.x = 0.5;
        alien.anchor.y = 0.5;
        alien.scale.x = objectNormalScaleMin;
        alien.scale.y = objectNormalScaleMin;
        alien.hitted = false; // extra
        alien.alpha = objectNormalAlphaMin;
        alien.speed = objectNormalSpeedMin; // extra

        objectsArray.push(alien);
        layer.addChild(objectsArray[i]);
      }
    }

    function onRenderClearExplosions() {
      var i = 0,
        length = killAnimationsToRemove.length;
      for (i; i < length; i += 1) {
        if (killAnimationsToRemove[i].alpha > 0) {
          killAnimationsToRemove[i].alpha -= 0.01;
        } else {
          layer.removeChild(killAnimationsToRemove.splice(i, 1)[0]);
          i -= 1;
          length -= 1;
        }
      }
    }

    function onRenderMove() {
      var i = 0,
        max = objectsArray.length,
        alien;

      for (i; i < max; i += 1) {

        alien = objectsArray[i];

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
          if (Math.abs(alien.position.x - alien.targetX) <= alien.speed) {
            alien.targetX = parseInt(Math.random() * layer.width, 10);
          }
          if (Math.abs(alien.position.y - alien.targetY) <= alien.speed) {
            alien.targetY = parseInt(Math.random() * layer.height, 10);
          }

          if (alien.hitted === true) {
            if (alien.scale.x < objectHittedScaleCap) {
              alien.scale.x += objectHittedScaleBeforeCap;
              alien.scale.y += objectHittedScaleBeforeCap;
            } else {
              alien.scale.x += objectHittedScaleAfterCap;
              alien.scale.y += objectHittedScaleAfterCap;
            }
            if (alien.alpha < 1) {
              alien.alpha += objectHittedAlphaStep;
            }
            if (alien.speed < objectHittedSpeedMax) {
              alien.speed += objectHittedSpeedStep;
            }

          } else {
            if (alien.scale.x > objectNormalScaleMin) {
              if (alien.scale.x > objectNormalScaleCap) {
                alien.scale.x -= objectNormalScaleBeforeCap;
                alien.scale.y -= objectNormalScaleBeforeCap;
              } else {
                alien.scale.x -= objectNormalScaleAfterCap;
                alien.scale.y -= objectNormalScaleAfterCap;
              }

            }
            if (alien.alpha > objectNormalAlphaMin) {
              alien.alpha -= objectNormalAlphaStep;
            }

            if (alien.speed > objectNormalSpeedMin) {
              alien.speed -= 1;
            }
          }

          if (alien.scale.x > 1.8) { // boom
            alien.visible = false;

            var explosion = new PIXI.MovieClip(textures.atlas.explosions);

            explosion.position.x = objectsArray[i].position.x;
            explosion.position.y = objectsArray[i].position.y;
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
      killAnimationsToRemove.push(this);
    }

    return layer;
  }
);