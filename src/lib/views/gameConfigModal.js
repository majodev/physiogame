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

      $('#settingsModalHolder').on('hidden.bs.modal', function() {
        showing = false;
      });

      $('#settingsModalHolder').on('shown.bs.modal', function() {
        showing = true;
      });

      $("#settingsDialogHeader").i18n();

      initialized = true;
    }

    function show() {
      if (!initialized) {
        init();
      }
      if(showing === false) {
        $("#settingsModalHolder").modal("show");
      }
    }

    function hide() {
      if (!initialized) {
        init();
      }
      if(showing === true) {
        $("#settingsModalHolder").modal("hide");
      }
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