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
      sceneManager.events.on("resettedScene", onSceneChanged);
      
      sceneManager.events.on("pushingScene", onSceneChanging);
      sceneManager.events.on("resettingScene", onSceneChanging);

      // definition of startscene of game
      sceneManager.pushScene("startscreen");
      //sceneManager.pushScene("shooting");
    }

    function onSceneChanging(sceneID) {
      // everytime before the scene changes, try to save the current stats
      stats.saveCurrent();
      log.debug(stats.debug());

      // if a new shooting scene will be build, make a new StatModel instance
      if(sceneID === "shooting") {
        log.debug("onSceneChanging: new scene id=" + sceneID);
        stats.getNew();
      }
    }

    function onSceneChanged(sceneID) {
      log.info("onSceneChanged: new scene id=" + sceneID);
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