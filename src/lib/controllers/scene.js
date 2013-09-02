define(["utils/publisher", "controllers/display", "underscore",
  "scenes/shooter", "scenes/welcome"
  ],
  function(publisher, display, _,
    shooter, welcome) {


    var events = publisher.make(),
      scenes = {
        welcome: welcome,
        shooter: shooter
      },
      currentScene;

    function exchangeScene(scene) {

      // disable previous Scene
      if (typeof currentScene !== 'undefined') {
        currentScene.deactivate();
        display.stage.removeChild(currentScene.getScene());
      }

      // reset current Scene
      currentScene = scene;
      scene.activate();
      display.stage.addChild(currentScene.getScene());

      // notify
      events.trigger("showScene", currentScene);
    }

    function showScene(name) {
      if (_.isUndefined(scenes[name]) === true) {
        throw new Error("showScene not possible, name (" + name + ") doesn't match any known scene or returns undefined!");
      } else {
        // if found, exchange current scene with new one.
        exchangeScene(scenes[name]);
      }
    }

    function init() {
      console.log("sceneController: init");
      events.trigger("init");
    }

    return {
      init: init,
      showScene: showScene,
      events: events
    };

  }
);