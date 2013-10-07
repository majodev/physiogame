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

      // definition of startscene of game
      sceneManager.pushScene("startscreen");
      //sceneManager.pushScene("shooting");
    }

    function onSceneChanged(newSceneName) {
      log.info("onSceneChanged: new scene id=" + newSceneName);
    }

    key('esc', function() {
      if (settingsModal.getShowing() === false) {
        settingsModal.show();
      } else {
        settingsModal.hide();
      }
    });

    function logDebugText(debugText) {
      log.debug(debugText);
    }

    // public
    return {
      init: init
    };
  }
);