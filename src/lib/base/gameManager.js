define(["log", "base/displayManager", "base/leapManager",
    "base/sceneManager", "views/modalControls",
    "game/stats", "game/gameSession"
  ],
  function(log, displayManager, leapManager,
    sceneManager, modalControls,
    stats, gameSession) {

    function init() {
      log.debug("gameController: init");

      displayManager.init();
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

      if (sceneID === "shooting") {
        // every new shooting layer push gets a new session automatically
        gameSession.newSession();
      }

    }

    function onSceneChanged(sceneID, oldSceneID) {
      log.info("onSceneChanged: new scene id=" + sceneID);
    }

    // public
    return {
      init: init
    };
  }
);