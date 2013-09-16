define(["log", "base/displayManager", "base/leapManager", "base/sceneManager", "key",
  "base/soundManager", "views/settingsModal"
  ],
  function(log, displayManager, leapManager, sceneManager, key,
    soundManager, settingsModal) {

    // private
    var showDebug = false;

    function init() {
      log.debug("gameController: init");

      displayManager.init();
      soundManager.init();
      sceneManager.init();
      leapManager.init();

      sceneManager.events.on("pushedScene", onSceneChanged);
      sceneManager.pushScene("startscreen");
    }

    function onSceneChanged(newSceneName) {
      log.info("onSceneChanged: new scene id=" + newSceneName);
    }

    key('enter', function() {
      toggleScene();
    });

    key('esc', function() {
      if (settingsModal.getShowing() === false) {
        settingsModal.show();
      } else {
        settingsModal.hide();
      }
    });

    function toggleScene() {

      if(sceneManager.getCurrentSceneID() === "shooting") {
        sceneManager.pushScene("startscreen");
      } else {
        sceneManager.pushScene("shooting");
      }
    }

    function logDebugText(debugText) {
      log.debug(debugText);
    }

    // public
    return {
      init: init
    };
  }
);