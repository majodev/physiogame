define(["log", "controllers/displayManager", "controllers/leapManager", "controllers/sceneManager", "key",
  "controllers/soundManager"
  ],
  function(log, displayManager, leapManager, sceneManager, key,
    soundManager) {

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

    function toggleDebugInfo() {
      if (showDebug === true) {
        displayManager.events.off("debugInfo", logDebugText);
        leapManager.events.off("debugInfo", logDebugText);
        log.debug("hiding debug info (keyboard d)");
        showDebug = false;

      } else {
        displayManager.events.on("debugInfo", logDebugText);
        leapManager.events.on("debugInfo", logDebugText);
        log.debug("showing debug info (keyboard d)");
        showDebug = true;
      }
    }

    key('enter', function() {
      toggleScene();
    });

    key('d', function() {
      toggleDebugInfo();
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