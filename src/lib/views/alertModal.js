define(["log", "jquery", "Handlebars", "underscore",
    "hbars!views/templates/alertTemplate", "base/soundBridge",
    "bootstrap",
  ],
  function(log, $, Handlebars, _,
    alertTemplate, soundBridge) {

    var showing = false;

    function show(options) {
      if (getShowing() === true) {
        clearOldAndReshow(options);
      } else {
        appendNew(options);
        soundBridge.play("alert");
      }
    }

    function hide() {
      if (getShowing() === true) {
        $('#alertModalHolder').on('hidden.bs.modal', function() {
          clearElement();
        });
        $("#alertModalHolder").modal("hide");
      }
    }

    function appendNew(options) {
      $("#alertModal").append(alertTemplate({
        text: _.isUndefined(options.text) ? "no text" : options.text,
        head: _.isUndefined(options.head) ? "no head" : options.head
      }));
      $("#alertModalHolder").modal("show");
      $('#alertModalHolder').on('hidden.bs.modal', function() {
        clearElement();
      });
      if(_.isUndefined(options.autoDismiss) === false) {
        setTimeout(function () {
          hide();
        }, options.autoDismiss);
      }
    }

    function clearOldAndReshow(options) {
      $('#alertModalHolder').on('hidden.bs.modal', function() {
        clearElement();
        show(options); // self invoke after hidden.
      });
      $("#alertModalHolder").modal("hide");
    }

    function clearElement() {
      $("#alertModal").empty();
    }

    function getShowing() {
      return ($("#alertModalHolder").length > 0) ? true : false;
    }

    return {
      show: show,
      hide: hide,
      getShowing: getShowing
    };
  }
);