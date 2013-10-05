define(["display/textures", "gameConfig", "utils/hittest", "underscore", "PIXI",
    "entities/scoreEntity", "base/soundManager", "gameObjects/crosshairGO", "classes/Layer",
    "behaviours/targetBehaviour", "behaviours/alphaBehaviour", "behaviours/scaleBehaviour",
    "behaviours/speedBehaviour"
  ],
  function(textures, gameConfig, hittest, _, PIXI,
    scoreEntity, soundManager, crosshairGO, Layer,
    targetBehaviour, alphaBehaviour, scaleBehaviour,
    speedBehaviour) {

    var layer = new Layer({
      listeners: {
        render: true,
        leap: true
      }
    });

    var gameObjects = [],
      killAnimationsToRemove = [],
      opt;


    layer.onActivate = function() {

      // get the current set options from the model
      opt = {
        objectHittedScaleCap: gameConfig.get("objectHittedScaleCap"),
        objectHittedScaleBeforeCap: gameConfig.get("objectHittedScaleBeforeCap"),
        objectHittedScaleAfterCap: gameConfig.get("objectHittedScaleAfterCap"),
        objectHittedSpeedMax: gameConfig.get("objectHittedSpeedMax"),
        objectHittedSpeedStep: gameConfig.get("objectHittedSpeedStep"),
        objectHittedAlphaStep: gameConfig.get("objectHittedAlphaStep"),
        objectNormalScaleMin: gameConfig.get("objectNormalScaleMin"),
        objectNormalScaleCap: gameConfig.get("objectNormalScaleCap"),
        objectNormalScaleBeforeCap: gameConfig.get("objectNormalScaleBeforeCap"),
        objectNormalScaleAfterCap: gameConfig.get("objectNormalScaleAfterCap"),
        objectNormalAlphaMin: gameConfig.get("objectNormalAlphaMin"),
        objectNormalAlphaStep: gameConfig.get("objectNormalAlphaStep"),
        objectNormalSpeedMin: gameConfig.get("objectNormalSpeedMin"),
        objectHittedScaleExplodes: gameConfig.get("objectHittedScaleExplodes"),
        objectNormalSpeedStep: gameConfig.get("objectNormalSpeedStep"),
        objectHittedSpeedMin: gameConfig.get("objectHittedSpeedMin"),
        objectNormalSpeedMax: gameConfig.get("objectNormalSpeedMax")
      };

      createGameObjects();

      crosshairGO.events.on("crosshairActive", detectCrosshairHitsAlien);
    };

    layer.onDeactivate = function() {
      crosshairGO.events.off("crosshairActive", detectCrosshairHitsAlien);

      gameObjects = [];
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
        max = gameObjects.length,
        hitCord = _.extend(coordinates, {
          width: 20,
          height: 20,
          anchor: {
            x: 0.5,
            y: 0.5
          }
        });

      for (i; i < max; i += 1) {
        if (gameObjects[i].visible === true) {
          hitted = hittest(gameObjects[i], hitCord);
          if (gameObjects[i].hitted !== hitted) {
            soundManager.hit();
          }
          gameObjects[i].hitted = hitted;
        }
      }
    }


    function createGameObjects() {

      var objectsToSpawn = gameConfig.get("objectsToSpawn"),
        i = 0,
        theTextures,
        theTexturesLength;

      theTextures = textures.atlas[gameConfig.get("objectTexture")];
      theTexturesLength = theTextures.length;

      // add gameObjects...
      for (i = 0; i < objectsToSpawn; i += 1) {

        //gameObject = new PIXI.Sprite(textures.atlas.gameObjects[i % 4]);

        gameObject = new PIXI.Sprite(theTextures[i % theTexturesLength]);

        // set its initial values...
        gameObject.position.x = parseInt(Math.random() * layer.width, 10);
        gameObject.position.y = parseInt(Math.random() * layer.height, 10);
        gameObject.targetX = parseInt(Math.random() * layer.width, 10); // extra
        gameObject.targetY = parseInt(Math.random() * layer.height, 10); // extra
        gameObject.anchor.x = 0.5;
        gameObject.anchor.y = 0.5;
        gameObject.scale.x = opt.objectNormalScaleMin;
        gameObject.scale.y = opt.objectNormalScaleMin;
        gameObject.hitted = false; // extra
        gameObject.alpha = opt.objectNormalAlphaMin;
        gameObject.speed = opt.objectNormalSpeedMin; // extra

        gameObjects.push(gameObject);
        layer.addChild(gameObjects[i]);
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
        max = gameObjects.length,
        gameObject;

      for (i; i < max; i += 1) {

        gameObject = gameObjects[i];

        if (gameObject.visible === true) {

          // change gameObject parameters via behaviours
          targetBehaviour.update(layer, gameObject, opt);
          alphaBehaviour.update(layer, gameObject, opt);
          scaleBehaviour.update(layer, gameObject, opt);
          speedBehaviour.update(layer,gameObject, opt);


          // when to explode...
          if (gameObject.scale.x > opt.objectHittedScaleExplodes) { // boom
            gameObject.visible = false;

            var explosion = new PIXI.MovieClip(textures.atlas.explosions);

            explosion.position.x = gameObjects[i].position.x;
            explosion.position.y = gameObjects[i].position.y;
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