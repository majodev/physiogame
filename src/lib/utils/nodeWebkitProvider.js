define(["underscore"],
  function(_) {

    var available = false,
      currentWindow;

    (function startup () {
      if(_.isUndefined(window.nwgui) === false) {
        currentWindow = window.nwgui.get();
      }
    }());

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

    function toggleLock() {
      if(available === true) {
        currentWindow.toggleKioskMode();
      }
    }

    function restartApp() {
      if(available === true) {
        currentWindow.reloadIgnoringCache();
      }
    }

    function getAvailable() {
      return available;
    }

    return {
      getAvailable: getAvailable,
      quitApp: quitApp,
      toggleFullscreen: toggleFullscreen,
      toggleLock: toggleLock,
      restartApp: restartApp
    };
  }
);