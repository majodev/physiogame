define(["log", "base/displayManager", "base/leapManager",
  "base/sceneManager", "key",
  "base/soundBridge", "views/gameConfigModal",
  "game/stats", "views/statsModal", "game/gameSession"
  ],
  function(log, displayManager, leapManager,
    sceneManager, key,
    soundBridge, gameConfigModal,
    stats, statsModal, gameSession) {

    // private
    var showDebug = false;

    function init() {
      log.debug("gameController: init");

      displayManager.init();
      //soundBridge.init();
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

    function onSceneChanging(sceneID, oldSceneID) {

      // save session if not already happenend.
      gameSession.endSession();

      // everytime before the scene changes from shooting, try to save the current stats
      // if(oldSceneID === "shooting") {
      //   stats.saveCurrent();
      // }

      // if a new shooting scene will be build, make a new StatModel instance
      // if(sceneID === "shooting") {
      //   log.debug("onSceneChanging: new scene id=" + sceneID);
      //   stats.getNew();
      // }
      
      if(sceneID === "shooting") {
        // every new shooting layer gets a new session
        gameSession.newSession();
      }

    }

    function onSceneChanged(sceneID, oldSceneID) {
      log.info("onSceneChanged: new scene id=" + sceneID);


    }

    key('esc', function() {
      if (gameConfigModal.getShowing() === false) {
        gameConfigModal.show();
      } else {
        gameConfigModal.hide();
      }
    });

    key('s', function() {
      if (statsModal.getShowing() === false) {
        statsModal.show();
      } else {
        statsModal.hide();
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