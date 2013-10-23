define(["underscore", "gameConfig"],
  function(_, gameConfig) {

    var available = false,
      kioskMode,
      currentWindow;

    (function startup () {
      if(_.isUndefined(window.nwWindow) === false) {
        currentWindow = window.nwWindow;
        available = true;
        setKioskMode(gameConfig.get("kioskMode"));
      }
    }());

    gameConfig.on("change", function(model, options) {
      setKioskMode(gameConfig.get("kioskMode"));
    });

    function setKioskMode(enabled) {
      if(available === true) {
        if(enabled === true) {
          if(currentWindow.isKioskMode === false) {
            currentWindow.enterKioskMode();
          }
        } else {
          if(currentWindow.isKioskMode === true) {
            currentWindow.leaveKioskMode();
          }
        }
      }
    }

    function quitApp() {
      if(available === true) {
        currentWindow.close(true);
      }
    }

    function toggleFullscreen() {
      if(available === true) {
        currentWindow.toggleFullscreen();
      }
    }

    function isFullscreen() {
      if(available === true) {
        return currentWindow.isFullscreen;
      } else {
        return false;
      }
    }

    function isAvailable() {
      return available;
    }

    return {
      isAvailable: isAvailable,
      quitApp: quitApp,
      toggleFullscreen: toggleFullscreen,
      isFullscreen: isFullscreen
    };
  }
);