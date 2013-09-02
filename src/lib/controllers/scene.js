define(["scenes/mainScene", "utils/publisher", "controllers/display"],
  function(mainScene, publisher, display) {
    var events = publisher.make(),
      currentScene;

    function showMainScene() {

      if(typeof currentScene !== 'undefined') {
        currentScene.deactivate();
        display.stage.removeChild(currentScene.getScene());
      }

      currentScene = mainScene;
      mainScene.activate();

      display.stage.addChild(currentScene.getScene());

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