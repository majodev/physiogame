define(["game/textures", "gameConfig", "utils/hittest", "underscore", "PIXI",
    "game/scoreEntity", "base/soundManager", "game/crosshairGO", "classes/Layer",
    "Poll",
    "game/behaviours/targetBehaviour", "game/behaviours/alphaBehaviour",
    "game/behaviours/scaleBehaviour", "game/behaviours/speedBehaviour"
  ],
  function(textures, gameConfig, hittest, _, PIXI,
    scoreEntity, soundManager, crosshairGO, Layer,
    Poll,
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
      opt;


    layer.onActivate = function() {

      // opt holds all current options from the gameConfig that are relevant for this layer
      // get the current set options from the model
      opt = {
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
        interval: opt.introTimerLength/opt.objectsToSpawn,
        action: function() {
          if(gameObjects.length < opt.objectsToSpawn) {
            attachNewGameObject(gameObjects.length);
          } else {

            // all done, make them interactive...
            crosshairGO.events.on("crosshairActive", detectPointerHitsGameObject);
            Poll.stop("gameObjectCreator"); // kill this poll.
            allGameObjectsCreated = true;
          }
        }
      });      
    };

    function attachNewGameObject(i) {
      var gameObject = new PIXI.Sprite(opt.texturePackage[i % opt.textureCount]);

      

      // set its initial values...
      gameObject.anchor.x = 0.5;
      gameObject.anchor.y = 0.5;
      gameObject.scale.x = opt.objectNormalScaleMin;
      gameObject.scale.y = opt.objectNormalScaleMin;
      gameObject.hitted = false; // extra
      gameObject.alpha = opt.objectNormalAlphaMin;
      gameObject.speed = opt.objectNormalSpeedMin; // extra

      // set positions and targets accordingliy...
      
      gameObject.position.x = _.random(gameObject.width/2, layer.width-gameObject.width/2);
      gameObject.position.y = _.random(gameObject.height/2, layer.height-gameObject.height/2);
      gameObject.targetX = _.random(gameObject.width/2, layer.width-gameObject.width/2);
      gameObject.targetY = _.random(gameObject.height/2, layer.height-gameObject.height/2);
      // gameObject.position.x = parseInt(Math.random() * layer.width, 10);
      // gameObject.position.y = parseInt(Math.random() * layer.height, 10);
      // gameObject.targetX = parseInt(Math.random() * layer.width, 10); // extra
      // gameObject.targetY = parseInt(Math.random() * layer.height, 10); // extra

      gameObjects.push(gameObject);
      layer.addChild(gameObjects[i]);
    }

    layer.onDeactivate = function() {
      crosshairGO.events.off("crosshairActive", detectPointerHitsGameObject);

      Poll.stop("gameObjectCreator"); // kill creator poll if still running...

      allGameObjectsCreated = false;
      gameObjects = [];
      killAnimationsToRemove = [];
    };

    layer.onRender = function() {
      if(allGameObjectsCreated) {
        onRenderMove();
        onRenderClearExplosions();
      }
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