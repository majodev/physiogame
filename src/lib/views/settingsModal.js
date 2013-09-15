define(["jquery", "text!views/settingsModal.html", "bootstrap"],
  function($, modalHTML) {

    var initialized = false;

    function init() {
      $("#settingsModal").append(modalHTML);
      initialized = true;
    };

    function show() {
      if(!initialized) {
        init();
      }
      $('#myModal').modal("show");
    }

    console.log("settingsModal init!");
    console.log(modalHTML);

    return {
      show: show
    };
  }
);