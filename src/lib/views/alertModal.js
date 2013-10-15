define(["log", "jquery", "Handlebars", "underscore",
    "hbars!views/templates/alertTemplate", "bootstrap"
  ],
  function(log, $, Handlebars, _,
    alertTemplate) {

    var showing = false;

    function show(options) {
      if (showing === true) {
        clearOldAndReshow(options);
      } else {
        appendNew(options);
      }
    }

    function hide() {
      if (showing === true) {
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
      showing = true;
    }

    function clearOldAndReshow(options) {
      $('#alertModalHolder').on('hidden.bs.modal', function() {
        clearElement();
        show(options); // self invoke after hidden.
      });
      $("#alertModalHolder").modal("hide");
    }

    function clearElement() {
      showing = false;
      $("#alertModal").empty();
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