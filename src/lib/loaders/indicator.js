define(["Spinner", "appConfig"],
  function(Spinner, appConfig) {

    var opts = {
      lines: 13, // The number of lines to draw
      length: 0, // The length of each line
      width: 13, // The line thickness
      radius: 23, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 15, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#FFF', // #rgb or #rrggbb or array of colors
      speed: 1.1, // Rounds per second
      trail: 60, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: appConfig.get("spinnerClassName"), // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: "35", // Top position relative to parent in px
      left: "auto" // Left position relative to parent in px
    },
      target = document.getElementById(appConfig.get("spinnerTargetID")),
      spinner;

    function enable() {
      if (spinner === undefined) {
        spinner = new Spinner(opts).spin(target);
      } else {
        spinner.spin();
      }
    }

    function disable() {
      if (spinner !== undefined) {
        spinner.stop();
      }
    }

    return {
      enable: enable,
      disable: disable
    };
  }
);