define(["log", "utils/publisher", "base/displayManager", "underscore",
    "game/sceneMap", "base/soundBridge"
  ],
  function(log, publisher, displayManager, _,
    sceneMap, soundBridge) {

    var events = publisher.make(),
      currentScene = {
        id: undefined,
        object: undefined
      };

    function exchangeScene(newID, newScene) {

      var oldID = currentScene.id,
        lastInteraction;

      // disable previous Scene
      if (typeof currentScene.object !== 'undefined') {
        currentScene.object.events.off("sceneLayerEvent", onSceneLayerEvent);
        lastInteraction = currentScene.object.deactivate();
        displayManager.stage.removeChild(currentScene.object.getScene());
      }

      // notify before pushing
      events.trigger("pushingScene", newID, oldID);

      // reset current Scene
      currentScene = {
        id: newID,
        object: newScene
      };

      currentScene.object.events.on("sceneLayerEvent", onSceneLayerEvent);
      currentScene.object.activate(lastInteraction);
      displayManager.stage.addChild(currentScene.object.getScene());

      // play the background if defined.
      if (typeof currentScene.object.backgroundMusic !== 'undefined') {
        soundBridge.playBackgroundMusic(currentScene.object.backgroundMusic);
      }

      // notify after push complete.
      events.trigger("pushedScene", getCurrentSceneID(), oldID);
    }

    // syntactic sugar for exchangeScene public api

    function pushScene(id) {
      exchangeScene(id, sceneMap.getScene(id));
    }

    function resetCurrentScene() {
      if (typeof currentScene.object !== 'undefined') {
        // notify before resetting
        events.trigger("resettingScene", currentScene.id);
        currentScene.object.reset();

        // play the background if defined.
        if (typeof currentScene.object.backgroundMusic !== 'undefined') {
          soundBridge.playBackgroundMusic(currentScene.object.backgroundMusic);
        }

        events.trigger("resettedScene", currentScene.id);
      }
    }

    function onSceneLayerEvent(options) {
      //console.log("onSceneLayerEvent: " + options);
      if (_.isUndefined(options) === false) {
        if (_.isUndefined(options.pushScene) === false) {
          pushScene(options.pushScene);
        }
        if (_.isUndefined(options.resetCurrentScene) === false) {
          resetCurrentScene();
        }
      }
    }

    function getCurrentSceneID() {
      return currentScene.id;
    }

    function getCurrentSceneObject() {
      return currentScene.object;
    }

    function init() {
      log.debug("sceneManager: init");
      events.trigger("init");
    }

    return {
      init: init,
      pushScene: pushScene,
      resetCurrentScene: resetCurrentScene,
      events: events,
      getCurrentSceneID: getCurrentSceneID,
      getCurrentSceneObject: getCurrentSceneObject
    };

  }
);