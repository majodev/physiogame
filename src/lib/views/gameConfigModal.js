define(["log", "jquery", "views/GameConfigView",
    "text!views/templates/gameConfigModal.html", "bootstrap"
  ],
  function(log, $, GameConfigView, modalHTML) {

    var initialized = false,
      gameConfigView,
      showing = false;

    function init() {
      log.debug("settingsModal: init");
      $("#settingsModal").append(modalHTML);
      gameConfigView = new GameConfigView({
        el: $("#gameConfig")
      });

      $('#settingsModalHolder').on('hide.bs.modal', function() {
        showing = false;
      });

      initialized = true;
    }

    function show() {
      if (!initialized) {
        init();
      }
      $("#settingsModalHolder").modal("show");
      showing = true;
    }

    function hide() {
      if (!initialized) {
        init();
      }
      $("#settingsModalHolder").modal("hide");
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