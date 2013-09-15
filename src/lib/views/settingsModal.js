define(["log", "jquery", "views/ObjectsConfigView",
  "text!views/templates/settingsModal.html", "bootstrap"],
  function(log, $, ObjectsConfigView,
    modalHTML) {

    var initialized = false,
      objectsConfigView;

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
    }

    //console.log("settingsModal init!");
    //console.log(modalHTML);

    return {
      show: show
    };
  }
);