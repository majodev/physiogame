define(["display/textures", "objectsConfig", "utils/hittest", "underscore", "PIXI",
    "entities/scoreEntity", "base/soundManager", "gameObjects/crosshairGO", "classes/Layer"
  ],
  function(textures, objectsConfig, hittest, _, PIXI, scoreEntity, soundManager, crosshairGO, Layer) {

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
      objectHittedAlphaStep,
      objectNormalScaleMin,
      objectNormalScaleCap,
      objectNormalScaleBeforeCap,
      objectNormalScaleAfterCap;
      

    layer.onActivate = function() {

      objectHittedScaleCap = objectsConfig.get("objectHittedScaleCap");
      objectHittedScaleBeforeCap = objectsConfig.get("objectHittedScaleBeforeCap");
      objectHittedScaleAfterCap = objectsConfig.get("objectHittedScaleAfterCap");
      objectHittedSpeedMax = objectsConfig.get("objectHittedSpeedMax");
      objectHittedSpeedStep = objectsConfig.get("objectHittedSpeedStep");
      objectHittedAlphaStep = objectsConfig.get("objectHittedAlphaStep");
      objectNormalScaleMin = objectsConfig.get("objectHittedAlphaStep");
      objectNormalScaleCap = objectsConfig.get("objectNormalScaleCap");
      objectNormalScaleBeforeCap = objectsConfig.get("objectNormalScaleBeforeCap");
      objectNormalScaleAfterCap = objectsConfig.get("objectNormalScaleAfterCap");

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

      var objectsToSpawn = objectsConfig.get("objectsToSpawn"),
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
        alien.scale.x = 0.2;
        alien.scale.y = 0.2;
        alien.hitted = false; // extra
        alien.alpha = 0.5;
        alien.speed = 1; // extra

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
          if (alien.position.x === alien.targetX) {
            alien.targetX = parseInt(Math.random() * layer.width, 10);
          }
          if (alien.position.y === alien.targetY) {
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
            if (alien.speed <= objectHittedSpeedMax) {
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
            if (alien.alpha > 0.5) {
              alien.alpha -= 0.01;
            }

            if (alien.speed > 1) {
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