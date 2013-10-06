define(["log", "utils/publisher", "base/displayManager", "underscore",
    "game/sceneMap"
  ],
  function(log, publisher, displayManager, _,
    sceneMap) {

    var events = publisher.make(),
      currentScene = {
        id: undefined,
        object: undefined
      };

    function exchangeScene(newID, newScene) {

      // disable previous Scene
      if (typeof currentScene.object !== 'undefined') {
        currentScene.object.events.off("sceneLayerEvent", onSceneLayerEvent);
        currentScene.object.deactivate();
        displayManager.stage.removeChild(currentScene.object.getScene());
      }

      // reset current Scene
      currentScene = {
        id: newID,
        object: newScene
      };

      currentScene.object.events.on("sceneLayerEvent", onSceneLayerEvent);
      currentScene.object.activate();
      displayManager.stage.addChild(currentScene.object.getScene());

      // notify
      events.trigger("pushedScene", getCurrentSceneID());
    }

    // syntactic sugar for exchangeScene public api

    function pushScene(id) {
      exchangeScene(id, sceneMap.getScene(id));
    }

    function resetCurrentScene() {
      if (typeof currentScene.object !== 'undefined') {
        currentScene.object.reset();
      }
    }

    function onSceneLayerEvent(options) {
      //console.log("onSceneLayerEvent: " + options);
      if (_.isUndefined(options) === false) {
        if(_.isUndefined(options.pushScene) === false) {
          pushScene(options.pushScene);
        }
        if(_.isUndefined(options.resetCurrentScene) === false) {
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
      log.debug("sceneController: init");
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