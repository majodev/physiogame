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

      $('#statsModalHolder').on('hide.bs.modal', function() {
        showing = false;
        statsView.visible = false;
      });

      initialized = true;
    }

    function show() {
      if (!initialized) {
        init();
      }
      $("#statsModalHolder").modal("show");
      showing = true;
      statsView.visible = true;

      statsView.render();
    }

    function hide() {
      if (!initialized) {
        init();
      }
      $("#statsModalHolder").modal("hide");
      showing = false;
      statsView.visible = false;
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