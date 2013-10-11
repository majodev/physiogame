define(["game/textures", "gameConfig", "utils/hittest", "underscore", "PIXI",
    "base/soundManager", "game/crosshairGO", "classes/Layer",
    "Poll", "game/stats",
    "game/behaviours/targetBehaviour", "game/behaviours/alphaBehaviour",
    "game/behaviours/scaleBehaviour", "game/behaviours/speedBehaviour"
  ],
  function(textures, gameConfig, hittest, _, PIXI,
    soundManager, crosshairGO, Layer,
    Poll, stats,
    targetBehaviour, alphaBehaviour,
    scaleBehaviour, speedBehaviour) {

    var layer = new Layer({
      listeners: {
        render: true,
        leap: true
      }
    });

    var gameObjects = [],
      killAnimationsToRemove = [],
      allGameObjectsCreated = false,
      ingameObjectCreatorRunning = false,
      ingameObjectCreatorTimeElapsed = 0,
      opt;


    layer.onActivate = function() {

      ingameObjectCreatorTimeElapsed = 0;

      // opt holds all current options from the gameConfig that are relevant for this layer
      // get the current set options from the model
      opt = {
        gameMode: gameConfig.get("gameMode"),
        gameMaxTime: gameConfig.get("gameMaxTime"),
        gameReattachObjectAfterMs: gameConfig.get("gameReattachObjectAfterMs"),
        gameReattachObjectMax: gameConfig.get("gameReattachObjectMax"),
        objectsToSpawn: gameConfig.get("objectsToSpawn"),
        texturePackage: textures.atlas[gameConfig.get("objectTexture")],
        textureCount: textures.atlas[gameConfig.get("objectTexture")].length,
        introTimerLength: gameConfig.get("introTimerLength"),
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


      Poll.start({
        name: "gameObjectCreator",
        interval: opt.introTimerLength / opt.objectsToSpawn,
        action: function() {
          if (gameObjects.length < opt.objectsToSpawn) {
            attachNewGameObject(gameObjects.length);
          } else {
            // all done, make it interactive...
            crosshairGO.events.on("crosshairActive", detectPointerHitsGameObject);
            Poll.stop("gameObjectCreator"); // kill this poll.
            allGameObjectsCreated = true;

            attachInGameObjectAdder();
          }
        }
      });
    };

    function attachInGameObjectAdder() {
      if (opt.gameMode === "clearInTime") {
        Poll.start({
          name: "inGameObjectCreator",
          interval: opt.gameReattachObjectAfterMs,
          action: function() {

            var gameObjectsLength = gameObjects.length,
              missingObjectCount = opt.objectsToSpawn - gameObjectsLength,
              i = 0;

            // signal its still running.
            ingameObjectCreatorRunning = true;


            if (ingameObjectCreatorTimeElapsed >= (opt.gameMaxTime * 1000)) {
              // don't add more, it's finished!
              ingameObjectCreatorRunning = false;
              Poll.stop("inGameObjectCreator");
            } else {

              // increase elapsed timer...
              ingameObjectCreatorTimeElapsed += opt.gameReattachObjectAfterMs;

              // add missing objects but comply with gameReattachObjectMax
              if (missingObjectCount > opt.gameReattachObjectMax) {
                missingObjectCount = opt.gameReattachObjectMax;
              }

              // attach the count needed.
              for (i; i < missingObjectCount; i += 1) {
                attachNewGameObject(gameObjectsLength + i);
              }

            }
          }
        });
      }
    }

    function attachNewGameObject(i) {
      var gameObject = new PIXI.Sprite(opt.texturePackage[i % opt.textureCount]);

      // set its initial values...
      gameObject.anchor.x = 0.5;
      gameObject.anchor.y = 0.5;
      gameObject.scale.x = 0; // will be set to minNormal after introduced!
      gameObject.scale.y = 0; // will be set to minNormal after introduced!
      gameObject.hitted = false; // extra
      gameObject.alpha = 0; // will be set to minNormal after introduced!
      gameObject.speed = opt.objectNormalSpeedMin; // extra
      gameObject.introducing = true; // signales that its being introduced and not hitable

      // set positions and targets accordingliy...

      gameObject.position.x = _.random(gameObject.width / 2, layer.width - gameObject.width / 2);
      gameObject.position.y = _.random(gameObject.height / 2, layer.height - gameObject.height / 2);
      gameObject.targetX = _.random(gameObject.width / 2, layer.width - gameObject.width / 2);
      gameObject.targetY = _.random(gameObject.height / 2, layer.height - gameObject.height / 2);

      gameObjects.push(gameObject);
      layer.addChild(gameObjects[i]);
    }

    layer.onDeactivate = function() {
      crosshairGO.events.off("crosshairActive", detectPointerHitsGameObject);

      if (allGameObjectsCreated === false) {
        Poll.stop("gameObjectCreator"); // kill creator poll if still running...
      }

      if (ingameObjectCreatorRunning === true) {
        Poll.stop("inGameObjectCreator");
      }

      allGameObjectsCreated = false;
      gameObjects = [];
      killAnimationsToRemove = [];
    };

    layer.onRender = function() {
      //if (allGameObjectsCreated) {
        onRenderAnimateGameObjects();
        onRenderClearExplosions();
      //}
    };

    layer.onHandFrame = function(coordinates) {
      detectPointerHitsGameObject(coordinates);
    };

    function detectPointerHitsGameObject(coordinates) {
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

      resetAllHittedToFalse();

      for (i = max - 1; i >= 0; i -= 1) {
        if (gameObjects[i].visible === true) {
          hitted = hittest(gameObjects[i], hitCord);
          if (gameObjects[i].hitted !== hitted) {
            soundManager.hit();
          }
          gameObjects[i].hitted = hitted;
          if (hitted === true) {
            swapGameObjectToTop(gameObjects[i], i, max);
            return;
          }
        }
      }
    }

    function swapGameObjectToTop(gameObject, arrayPosition, arrayLength) {
      var top = layer.pixiLayer.getChildAt(layer.pixiLayer.children.length - 1),
        topArray = gameObjects[arrayLength - 1];

      // swap in display
      if (top !== gameObject) {
        // Swapchildren is currently unsupported in pixi -.-
        // ugly approach:
        layer.pixiLayer.removeChild(gameObject);
        layer.pixiLayer.addChild(gameObject);
      }

      // swap in array
      if (topArray !== gameObject) {
        gameObjects[arrayPosition] = topArray;
        gameObjects[arrayLength - 1] = gameObject;
      }

    }

    function resetAllHittedToFalse() {
      var i = 0,
        len = gameObjects.length;
      for (i; i < len; i += 1) {
        if (gameObjects[i].visible === true) {
          gameObjects[i].hitted = false;
        }
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

    function onRenderAnimateGameObjects() {
      var i = 0,
        max = gameObjects.length,
        gameObject;

      for (i; i < max; i += 1) {

        gameObject = gameObjects[i];

        // gameObject must be introduced...
        if (gameObject.introducing === false) {

          // change gameObject parameters via behaviours
          targetBehaviour.update(layer, gameObject, opt);
          alphaBehaviour.update(layer, gameObject, opt);
          scaleBehaviour.update(layer, gameObject, opt);
          speedBehaviour.update(layer, gameObject, opt);


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


            stats.getCurrent().raiseScore();

            // finally clear the gameObject from the array and kill the gameObject
            layer.removeChild(gameObject);
            gameObjects.splice(i, 1);
            i -= 1;
            max -= 1;
          }
        } else {
          // gameObject wasn't introduced till here.
          
          // alpha to minimum
          if(gameObject.alpha < opt.objectNormalAlphaMin) {
            gameObject.alpha += 0.01;
            if(gameObject.alpha > opt.objectNormalAlphaMin) {
              gameObject.alpha = opt.objectNormalAlphaMin;
            }
          }

          // scale to minimum
          if(gameObject.scale.x < opt.objectNormalScaleMin) {
            gameObject.scale.x += 0.01;
            gameObject.scale.y += 0.01;
            if(gameObject.scale.x > opt.objectNormalScaleMin) {
              gameObject.scale.x = opt.objectNormalScaleMin;
              gameObject.scale.y = opt.objectNormalScaleMin;
            }
          }

          // after conditions for introducing are met, its indroduced and handled!
          if(gameObject.alpha === opt.objectNormalAlphaMin &&
            gameObject.scale.x === opt.objectNormalScaleMin) {

            gameObject.introducing = false;
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