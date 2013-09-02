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
      events.trigger("showScene", getCurrentSceneIdentifier());
    }

    function showScene(name) {
      if (_.has(scenes, name) === false) {
        throw new Error("UNKNOWN SCENE - scenes have no property (" + name + ")!");
      } 
      if (scenes[name] === currentScene) {
        throw new Error("SAME SCENE - showScene not possible, scene with name (" + name + ") is already shown!");
      }
        
      // else found and new one, exchange current scene with new one.
      exchangeScene(scenes[name]);
    }

    function getCurrentSceneIdentifier() {
      var found = _.findKey(scenes, function (scene) {
        return scene === currentScene;
      });
      return found;
    }

    function init() {
      console.log("sceneController: init");
      events.trigger("init");
    }

    return {
      init: init,
      showScene: showScene,
      events: events,
      getCurrentSceneIdentifier: getCurrentSceneIdentifier
    };

  }
);