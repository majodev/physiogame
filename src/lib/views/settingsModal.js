define(["log", "jquery", "views/GameConfigView",
  "text!views/templates/settingsModal.html", "bootstrap"],
  function(log, $, GameConfigView,
    modalHTML) {

    var initialized = false,
      gameConfigView,
      showing = false;

    function init() {
      log.debug("settingsModal: init");
      $("#settingsModal").append(modalHTML);
      gameConfigView = new GameConfigView({
        el: $("#gameConfig")
      });
      initialized = true;
    }

    function show() {
      if (!initialized) {
        init();
      }
      $('#myModal').modal("show");
      showing = true;
    }

    function hide() {
      if (!initialized) {
        init();
      }
      $('#myModal').modal("hide");
      showing = false;
    }

    function getShowing() {
      return showing;
    }

    return {
      show: show,
      hide: hide,
      getShowing: getShowing
    };
  }
);