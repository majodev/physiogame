define(["underscore", "gameConfig"],
  function(_, gameConfig) {

    var available = false,
      inKioskModeCurrenty = false,
      inFullScreenModeCurrently = false,
      currentWindow;

    (function startup() {
      if (_.isUndefined(window.nwWindow) === false) {
        currentWindow = window.nwWindow;
        available = true;

        setFullscreenMode(gameConfig.checkKeyIsEnabled("fullScreenMode") &&
          gameConfig.get("fullScreenMode"));
        
        setKioskMode(gameConfig.checkKeyIsEnabled("kioskMode") &&
          gameConfig.get("kioskMode"));
      }
    }());

    gameConfig.on("change", function(model, options) {

      setFullscreenMode(gameConfig.checkKeyIsEnabled("fullScreenMode") &&
        gameConfig.get("fullScreenMode"));
      
      setKioskMode(gameConfig.checkKeyIsEnabled("kioskMode") &&
        gameConfig.get("kioskMode"));
    });

    function setKioskMode(enabled) {
      if (available === true) {
        if (enabled === true) {
          if (inKioskModeCurrenty === false) {
            currentWindow.enterKioskMode();
            console.log("Entering KioskMode");
          }
        } else {
          if (inKioskModeCurrenty === true) {
            currentWindow.leaveKioskMode();
            console.log("Leaving KioskMode");
          }
        }
        inKioskModeCurrenty = enabled;
      }
    }

    function quitApp() {
      if (available === true) {
        currentWindow.close(true);
      }
    }

    function setFullscreenMode(enabled) {
      if (available === true) {
        if (enabled === true) {
          if (inFullScreenModeCurrently === false) {
            currentWindow.enterFullscreen();
            console.log("Entering Fullscreen");
            inFullScreenModeCurrently = enabled;
          }
        } else {
          if (inFullScreenModeCurrently === true) {
            currentWindow.leaveFullscreen();
            console.log("Leaving Fullscreen");
            inFullScreenModeCurrently = enabled;
          }
        }
      }
    }

    function toggleFullscreen() {
      if (available === true && inKioskModeCurrenty === false) {
        gameConfig.set("fullScreenMode", !inFullScreenModeCurrently);
      }
    }

    function isFullscreen() {
      if (available === true) {
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