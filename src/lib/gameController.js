define(["displayController", "leapController"],
  function (displayController, leapController) {

    // private
    var init = function init() {
      console.log("init");
      displayController.start();
      leapController.start();
    };

    // public
    return {
      start: function start() {
        init();
      }
    };
});