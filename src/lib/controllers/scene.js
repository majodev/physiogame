define(["log", "utils/publisher", "controllers/display", "underscore",
  "factories/scenes"
  ],
  function(log, publisher, display, _,
    scenes) {

    var events = publisher.make(),
      currentScene = {
        id: undefined,
        object: undefined
      };

    function exchangeScene(newID, newScene) {

      // disable previous Scene
      if (typeof currentScene.object !== 'undefined') {
        currentScene.object.deactivate();
        display.stage.removeChild(currentScene.object.getScene());
      }

      // reset current Scene
      currentScene = {
        id: newID,
        object: newScene
      };

      newScene.activate();
      display.stage.addChild(currentScene.object.getScene());

      // notify
      events.trigger("pushedScene", getCurrentSceneID());
    }

    // syntactic sugar for exchangeScene public api
    function pushScene(id) {
      exchangeScene(id, scenes.makeScene(id));
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
      events: events,
      getCurrentSceneID: getCurrentSceneID,
      getCurrentSceneObject: getCurrentSceneObject
    };

  }
);