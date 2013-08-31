define(["scenes/mainScene", "Backbone", "underscore", "displayController"],
  function(mainScene, Backbone, _, displayController) {
    var events = _.clone(Backbone.Events),
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