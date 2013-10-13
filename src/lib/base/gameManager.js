define(["log", "base/displayManager", "base/leapManager",
  "base/sceneManager", "key",
  "base/soundManager", "views/settingsModal", "game/stats"
  ],
  function(log, displayManager, leapManager,
    sceneManager, key,
    soundManager, settingsModal, stats) {

    // private
    var showDebug = false;

    function init() {
      log.debug("gameController: init");

      displayManager.init();
      soundManager.init();
      sceneManager.init();
      leapManager.init();

      sceneManager.events.on("pushedScene", onSceneChanged);
      sceneManager.events.on("pushingScene", onBeforeSceneChanged);

      // definition of startscene of game
      sceneManager.pushScene("startscreen");
      //sceneManager.pushScene("shooting");
    }

    function onBeforeSceneChanged(newSceneName) {
      // if a new shooting scene will be build, make a new StatModel instance
      if(newSceneName === "shooting") {
        log.debug("onBeforeSceneChanged: new scene id=" + newSceneName);
        console.dir(stats.debug());
        stats.getNew();
      }
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