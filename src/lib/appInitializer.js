define(["appConfig", "log", "loaders/preloader", "loaders/indicator",
  "loaders/status"],
  function(appConfig, log, preloader, indicator,
    status) {

    (function preloading() {

      status.write("\nPreloading");
      indicator.enable();

      log.setLevel(appConfig.get("logLevel"));
      log.debug("self executing startup function - preloading, logLevel is " +
        appConfig.get("logLevel"));

      preloader.events.on("preloadedAll", preloadingFinished);
      preloader.init();
    }());

    function preloadingFinished() {

      log.debug("preloadingFinished");
      status.write("\n\nInitializing");

      // dynamic require! - dont forget to INCLUDE within build options
      // THIS IS NOT SEEN BY THE R.JS OPTIMIZER!
      // Preloading must finish before gameController gets included at all.
      require(["base/gameManager"], function(game) {
        game.init();
        indicator.disable();
        status.clear();
      });

    }
  }
);