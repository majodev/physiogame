define(["log", "base/displayManager", "base/leapManager", "base/sceneManager",
  "base/soundManager", "base/systemManager", "base/entityManager", "key"
  ],
  function(log, displayManager, leapManager, sceneManager, 
    soundManager, systemManager, entityManager, key) {

    // private
    var showDebug = false;

    function init() {
      log.debug("gameController: init");

      systemManager.init();
      displayManager.init();
      soundManager.init();
      entityManager.init();
      leapManager.init();
      sceneManager.init();

      // attach event for scene changes
      sceneManager.events.on("pushedScene", onSceneChanged);

      // start with first scene
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