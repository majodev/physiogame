define(["log", "jquery", "views/ObjectsConfigView",
  "text!views/templates/settingsModal.html", "bootstrap"],
  function(log, $, ObjectsConfigView,
    modalHTML) {

    var initialized = false,
      objectsConfigView,
      showing = false;

    function init() {
      log.debug("settingsModal: init");
      $("#settingsModal").append(modalHTML);
      objectsConfigView = new ObjectsConfigView({
        el: $("#objectsConfig")
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