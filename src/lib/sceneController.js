define(["scenes/mainScene", "utils/publisher", "displayController"],
  function(mainScene, publisher, displayController) {
    var events = publisher,
      currentScene;

    function showMainScene() {

      if(typeof currentScene !== 'undefined') {
        currentScene.deactivate();
        displayController.stage.removeChild(currentScene.getScene());
      }

      currentScene = mainScene;
      mainScene.activate();

      displayController.stage.addChild(currentScene.getScene());

      events.trigger("showScene", currentScene);
    }

    function init() {
      console.log("sceneController: init");
      events.trigger("init");
    }

    return {
      init: init,
      showMainScene: showMainScene,
      events: events
    };

  }
);