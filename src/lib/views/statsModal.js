define(["log", "jquery", "views/StatsView",
    "text!views/templates/statsModal.html", "bootstrap"
  ],
  function(log, $, StatsView,
    modalHTML) {

    var initialized = false,
      statsView,
      showing = false;

    function init() {
      log.debug("statsModal: init");
      $("#statsModal").append(modalHTML);

      statsView = new StatsView({
        el: $("#statsView")
      });

      $('#statsModalHolder').on('hidden.bs.modal', function() {
        showing = false;
        statsView.visible = false;
      });

      $('#statsModalHolder').on('shown.bs.modal', function() {
        showing = true;
        statsView.visible = true;
      });

      initialized = true;
    }

    function show() {
      if (!initialized) {
        init();
      }
      if(showing === false) {
        $("#statsModalHolder").modal("show");
        statsView.render();
      }
    }

    function hide() {
      if (!initialized) {
        init();
      }
      if(showing === true) {
        $("#statsModalHolder").modal("hide");
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