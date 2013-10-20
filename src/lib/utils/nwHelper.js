define(["underscore"],
  function(_) {

    var available = false,
      currentWindow;

    (function startup () {
      if(_.isUndefined(window.nwWindow) === false) {
        currentWindow = window.nwWindow;
        available = true;
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