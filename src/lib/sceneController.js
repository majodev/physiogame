define(["scenes/mainScene", "utils/eventPublisher", "displayController"],
  function(mainScene, eventPublisher, displayController) {
    var events = eventPublisher(["init", "showScene"]),
      currentScene;

    function showMainScene() {

      if(typeof currentScene !== 'undefined') {
        currentScene.deactivate();
        displayController.stage.removeChild(currentScene.getScene());
      }

      currentScene = mainScene;
      mainScene.activate();

      displayController.stage.addChild(currentScene.getScene());

      events.fire("showScene", currentScene);
    }

    function init() {
      console.log("sceneController: init");
      events.fire("init");
    }

    return {
      init: init,
      showMainScene: showMainScene,
      events: events
    };

  }
);