define(["game/textures", "gameConfig", "utils/hittest", "underscore", "PIXI",
    "base/soundBridge", "classes/Layer",
    "game/stats",
    "game/behaviours/targetBehaviour", "game/behaviours/alphaBehaviour",
    "game/behaviours/scaleBehaviour", "game/behaviours/speedBehaviour",
    "game/timerIntro", "game/timerRound", "utils/hitstatMiddlepoint"
  ],
  function(textures, gameConfig, hittest, _, PIXI,
    soundBridge, Layer,
    stats,
    targetBehaviour, alphaBehaviour,
    scaleBehaviour, speedBehaviour,
    timerIntro, timerRound, hitstatMiddlepoint) {

    var layer = new Layer({
      listeners: {
        render: true,
        leap: true,
        interactionMove: true,
        interactionClick: true
      }
    });

    var gameObjects = [],
      killAnimationsToRemove = [],
      hitStatsToRemove = [],
      introSucceeded = false,
      previousHitted,
      allowedToDepthAttack = true,
      opt;


    layer.onActivate = function() {

      gameObjects = [];
      specialGameObjects = [];
      killAnimationsToRemove = [];
      hitStatsToRemove = [];
      previousHitted = undefined;
      introSucceeded = false;
      allowedToDepthAttack = true;

      // opt holds all current options from the gameConfig that are relevant for this layer
      // get the current set options from the model
      opt = {
        gameMode: gameConfig.get("gameMode"),
        gameObjectCondition: gameConfig.get("gameObjectCondition"),
        probabilitySpecialObject: gameConfig.get("probabilitySpecialObject"),
        specialObjectEnabled: gameConfig.checkKeyIsEnabled("probabilitySpecialObject"),
        gameMaxTime: gameConfig.get("gameMaxTime"),
        gameReattachObjectAfterMs: gameConfig.get("gameReattachObjectAfterMs"),
        gameReattachObjectMax: gameConfig.get("gameReattachObjectMax"),
        objectsToSpawn: gameConfig.get("objectsToSpawn"),
        texturePackage: textures.atlas[gameConfig.get("objectTexture")],
        accuracyTextsEnabled: gameConfig.get("accuracyTextsEnabled"),
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


      // events to timers
      timerIntro.events.on("introTickSpawnObject", onTimerIntroTickSpawnObject);
      timerIntro.events.on("introEnd", onTimerIntroEnd);
      timerRound.events.on("roundReattach", onTimerRoundReattach);
      timerRound.events.on("roundEnd", onTimerRoundEnd);

    };

    function onTimerIntroEnd(tick) {
      introSucceeded = true;
    }

    function onTimerIntroTickSpawnObject(count) {
      var i = 0,
        len = count;

      for (i; i < len; i += 1) {
        if (gameObjects.length < opt.objectsToSpawn) {
          attachGameOrSpecialObject();
        }
      }
    }

    function attachGameOrSpecialObject() {
      if (opt.specialObjectEnabled === true) {
        if (Math.random() < opt.probabilitySpecialObject) {
          gameObjects.push(attachNewSpecialGameObject(gameObjects.length, true));
        } else {
          gameObjects.push(attachNewGameObject(gameObjects.length, true));
        }
      } else {
        gameObjects.push(attachNewGameObject(gameObjects.length, true));
      }
    }

    function onTimerRoundReattach(tick) {
      var missingObjectCount = opt.objectsToSpawn - gameObjects.length,
        i = 0;

      // add missing objects but comply with gameReattachObjectMax
      if (missingObjectCount > opt.gameReattachObjectMax) {
        missingObjectCount = opt.gameReattachObjectMax;
      }

      // attach the count needed.
      for (i; i < missingObjectCount; i += 1) {
        if (gameObjects.length < opt.objectsToSpawn) {
          attachGameOrSpecialObject();
        }
      }
    }

    function onTimerRoundEnd(tick) {
      removeAllGameObjects();
    }

    function attachNewGameObject(textureModInt, autoadd) {
      var gameObject = new PIXI.Sprite(opt.texturePackage[textureModInt % opt.textureCount]);

      // set its initial values...
      gameObject.anchor.x = 0.5;
      gameObject.anchor.y = 0.5;
      gameObject.scale.x = 0; // will be set to minNormal after introduced!
      gameObject.scale.y = 0; // will be set to minNormal after introduced!
      gameObject.hitted = false; // extra
      gameObject.alpha = 0; // will be set to minNormal after introduced!
      gameObject.speed = opt.objectNormalSpeedMin; // extra
      gameObject.introducing = true; // signales that its being introduced and not hitable
      gameObject.depthKick = layer.DEPTH.STEP;
      gameObject.isSpecial = false;

      // set positions and targets accordingliy...

      gameObject.position.x = _.random(gameObject.width / 2, layer.width - gameObject.width / 2);
      gameObject.position.y = _.random(gameObject.height / 2, layer.height - gameObject.height / 2);
      gameObject.targetX = _.random(gameObject.width / 2, layer.width - gameObject.width / 2);
      gameObject.targetY = _.random(gameObject.height / 2, layer.height - gameObject.height / 2);

      if (autoadd === true) {
        layer.addChild(gameObject);
      }

      return gameObject;
    }

    function attachNewSpecialGameObject(textureModInt, autoadd) {
      var special = attachNewGameObject(textureModInt, false);
      var specialCount = _.random(0, 5);
      var overlayText = new PIXI.Text(specialCount, {
        font: "bold 80px Arvo",
        fill: "#FFFFFF",
        align: "center",
        stroke: "#848484",
        strokeThickness: 2
      });
      overlayText.anchor = {
        x: 0.5,
        y: 0.5
      };
      var overlayLeap = new PIXI.Text("", {
        font: "bold 30px Arvo",
        fill: "#FF0000",
        align: "center",
        stroke: "#FFAAAA",
        strokeThickness: 5
      });
      overlayLeap.anchor = {
        x: 0.5,
        y: 1
      };
      overlayLeap.position.y = 80;
      special.specialCount = specialCount;
      special.isSpecial = true;
      special.initialCount = specialCount;
      special.addChild(overlayText);
      special.addChild(overlayLeap);
      special.overlay = overlayText;
      special.overlayLeap = overlayLeap;

      if (autoadd === true) {
        layer.addChild(special);
      }

      return special;
    }

    function removeAllGameObjects() {
      var len = gameObjects.length;

      for (var i = len - 1; i >= 0; i -= 1) {
        gameObjects[i].visible = false;
        gameObjects.splice(i, 1);
      }
    }

    layer.onDeactivate = function() {

      timerIntro.events.off("introTickSpawnObject", onTimerIntroTickSpawnObject);
      timerIntro.events.off("introEnd", onTimerIntroEnd);
      timerRound.events.off("roundReattach", onTimerRoundReattach);
      timerRound.events.off("roundEnd", onTimerRoundEnd);

      gameObjects = [];
      killAnimationsToRemove = [];
      hitStatsToRemove = [];
    };

    layer.onRender = function() {
      onRenderAnimateGameObjects();
      onRenderClearExplosions();
      onRenderClearHitStats();
    };

    layer.onClick = layer.onMove = layer.onHandFrame = function(coordinates) {
      //console.log(coordinates);
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

      if (introSucceeded) {
        checkResetDepthAttack(coordinates);
        resetAllHittedToFalse();

        for (i = max - 1; i >= 0; i -= 1) {
          if (gameObjects[i].visible === true && gameObjects[i].introducing === false) {
            hitted = hittest(gameObjects[i], hitCord);
            gameObjects[i].hitted = hitted;
            if (hitted === true) {
              if (_.isUndefined(previousHitted) === false && previousHitted !== gameObjects[i]) {
                soundBridge.play("hitted");
              }

              // where hitted? Middlepoint?
              gameObjects[i].hitStat = hitstatMiddlepoint(coordinates, gameObjects[i]);

              // the current coordinates obj, to the gameObject!
              gameObjects[i].coordinates = coordinates;

              swapGameObjectToTop(gameObjects[i], i, max);

              gameObjects[i].depthKick = coordinates.depth;
              previousHitted = gameObjects[i];
              return;
            }
          }
        }
      }
    }

    function checkResetDepthAttack(coordinates) {
      if (allowedToDepthAttack === false && coordinates.depth >= layer.DEPTH.STEP) {
        allowedToDepthAttack = true;
      }
    }

    function swapGameObjectToTop(gameObject, arrayPosition, arrayLength) {
      var top = layer.pixiLayer.getChildAt(layer.pixiLayer.children.length - 1),
        topArray = gameObjects[arrayLength - 1];

      // swap in display
      if (top !== gameObject) {
        // Swapchildren is currently not implemented in pixi -.-
        // ugly alternative approach (non speed proven) to just get it on the top here
        layer.pixiLayer.removeChild(gameObject);
        layer.pixiLayer.addChildAt(gameObject, arrayLength - 1);
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
          gameObjects[i].coordinates = undefined;
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

    function onRenderClearHitStats() {
      var i = hitStatsToRemove.length - 1;
      for (i; i >= 0; i -= 1) {
        if (hitStatsToRemove[i].alpha > 0) {
          hitStatsToRemove[i].alpha -= 0.01;
          hitStatsToRemove[i].position.y -= 0.8;
        } else {
          layer.removeChild(hitStatsToRemove[i]);
          hitStatsToRemove.splice(i, 1);
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
          if (checkForExplosion(gameObject) === true) {

            createExplosion(gameObject);
            createHitStat(gameObject);

            if(gameObject.isSpecial === true) {
              stats.getCurrent().raiseSpecial();
            }
            
            stats.getCurrent().raiseScore();

            // finally clear the gameObject from the array and kill the gameObject
            layer.removeChild(gameObject);
            gameObjects.splice(i, 1);
            i -= 1;
            max -= 1;
          }

        } else {
          // gameObject wasn't introduced till here.

          introduceGameObject(gameObject);
        }
      }
    }

    function introduceGameObject(gameObject) {
      // alpha to minimum
      if (gameObject.alpha < opt.objectNormalAlphaMin) {
        gameObject.alpha += 0.009;
        if (gameObject.alpha > opt.objectNormalAlphaMin) {
          gameObject.alpha = opt.objectNormalAlphaMin;
        }
      }

      // scale to minimum
      if (gameObject.scale.x < opt.objectNormalScaleMin) {
        gameObject.scale.x += 0.01;
        gameObject.scale.y += 0.01;
        if (gameObject.scale.x > opt.objectNormalScaleMin) {
          gameObject.scale.x = opt.objectNormalScaleMin;
          gameObject.scale.y = opt.objectNormalScaleMin;
        }
      }

      // after conditions for introducing are met, its indroduced and handled!
      if (gameObject.scale.x === opt.objectNormalScaleMin &&
        gameObject.alpha === opt.objectNormalAlphaMin) {

        gameObject.alpha = opt.objectNormalAlphaMin;

        gameObject.introducing = false;
      }
    }

    function checkForExplosion(gameObject) {

      var returnValue = false;

      switch (opt.gameObjectCondition) {
        case "objectScale":
          if (gameObject.scale.x > opt.objectHittedScaleExplodes) {
            returnValue = true;
          }
          break;
        case "clickOrDepth":
          if (gameObject.hitted === true && gameObject.depthKick <= -layer.DEPTH.STEP && allowedToDepthAttack === true) {
            allowedToDepthAttack = false; // this one can be smashed, but not a following one
            returnValue = true;
          }
          // handle special objects differently...
          if (gameObject.isSpecial === true) {

            // FOR LEAP!
            if (gameObject.hitted === true && gameObject.coordinates.leapCoordinates === true) {
              if (returnValue === true) { // there is currently a depthAttack going on, execute it!
                returnValue = decreaseSpecialObject(gameObject);
              } else { // no depthAttack currently, count the fingers...
                returnValue = specialObjectCheckLeap(gameObject);
              }
            } else {
              // no leap event, nor hitted, clear visible leap display of special element...
              gameObject.overlayLeap.visible = false;
            }

            // FOR MOUSE/TOUCH
            if (gameObject.hitted === true && gameObject.coordinates.leapCoordinates === false) {
              if (returnValue === true) {
                // execute a depth attack but check if it should really be destroyed now....
                returnValue = decreaseSpecialObject(gameObject);
              }
            }
          }
          break;
        default:
          log.error("gameObjects: gameObjectCondition not supported!");
          break;
      }

      return returnValue;
    }

    function decreaseSpecialObject(specialObject) {
      specialObject.specialCount -= 1;

      if (specialObject.specialCount >= 0) {
        specialObject.overlay.setText(specialObject.specialCount);
      } else {
        specialObject.overlay.setText("");
      }

      if (specialObject.specialCount >= 0) {
        return false; //should not explode now.
      } else {
        return true; // should explode now!
      }
    }

    function specialObjectCheckLeap(specialObject) {
      specialObject.overlayLeap.visible = true;
      if (specialObject.coordinates.fingerCount === specialObject.specialCount) {

        // it should explode now immediately. 
        // As a bonus for leap players, a object killed with this way dowsn't count to the accuracy! 
        specialObject.hitStat = "SPECIAL_KILL";
        return true; // should explode now!
      } else {
        // set the indicator in the object how many fingers are left to show!
        if (_.isUndefined(specialObject.leapLastFingerCount) === false) {
          if (specialObject.leapLastFingerCount === specialObject.coordinates.fingerCount) {
            // the same, dont reset the leap text as it saves us performance
          } else {
            // has changed to last time, reset it.
            specialObject.overlayLeap.setText(specialObject.coordinates.fingerCount);
            specialObject.leapLastFingerCount = specialObject.coordinates.fingerCount;
          }
        } else {
          // was never set, changed the text as we dont know whats on the and set a helper counter.
          specialObject.overlayLeap.setText(specialObject.coordinates.fingerCount);
          specialObject.leapLastFingerCount = specialObject.coordinates.fingerCount;
        }
        return false;
      }
    }

    function createHitStat(gameObject) {

      var hitStatText,
        hitStatToDisplay;

      // if they should be displayed... - else not...
      if (opt.accuracyTextsEnabled === true) {

        if (_.isUndefined(gameObject.hitStat) === true) {
          hitStatToDisplay = {
            percentageX: 0,
            percentageY: 0,
            percentageBothAxis: 0
          };
        } else {
          hitStatToDisplay = gameObject.hitStat;
        }

        if (gameObject.hitStat === "SPECIAL_KILL") {
          hitStatToDisplay = gameObject.coordinates.fingerCount + " Finger!"; // on a special kill with leap, show instead the fingers used!
        } else {
          hitStatToDisplay = Math.ceil(hitStatToDisplay.percentageBothAxis * 100) + " %";
        }

        hitStatText = new PIXI.Text(hitStatToDisplay, {
          font: "bold 30px Arvo",
          fill: "#FFFFFF",
          align: "center",
          stroke: "#848484",
          strokeThickness: 2
        });

        hitStatText.anchor = {
          x: 0.5,
          y: 0.5
        };

        hitStatText.position = gameObject.position;

        layer.addChild(hitStatText);
        hitStatsToRemove.push(hitStatText);
      }

      // finally update the stats...
      if (gameObject.hitStat !== "SPECIAL_KILL") {
        stats.getCurrent().updateAccuracy(gameObject.hitStat);
      } else {
        // TODO: Fingerkills have no stats currently, change this!
      }

    }

    // visuals for explosion of gameObject

    function createExplosion(gameObject) {
      gameObject.visible = false;

      var explosion = new PIXI.MovieClip(textures.atlas.explosions);

      explosion.position.x = gameObject.position.x;
      explosion.position.y = gameObject.position.y;
      explosion.anchor.x = 0.5;
      explosion.anchor.y = 0.5;

      explosion.rotation = Math.random() * Math.PI;
      explosion.scale.x = explosion.scale.y = 0.75 + Math.random() * 0.5;

      explosion.loop = false;
      explosion.gotoAndPlay(0);

      soundBridge.play("explosion");

      explosion.onComplete = onExplosionComplete;

      layer.addChild(explosion);
    }

    function onExplosionComplete() {
      killAnimationsToRemove.push(this);
    }

    return layer;
  }
);