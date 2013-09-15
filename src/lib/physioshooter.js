define(["appConfig", "log", "loaders/preloader"],
  function(appConfig, log, preloader) {

    (function preloading() {
      log.setLevel(appConfig.get("logLevel"));
      log.debug("self executing startup function - preloading, logLevel is " +
        appConfig.get("logLevel"));

      preloader.events.on("preloadedAll", preloadingFinished);
      preloader.init();
    }());

    function preloadingFinished() {
      
      log.debug("preloadingFinished");
      // dynamic require! - dont forget to INCLUDE within build options
      // THIS IS NOT SEEN BY THE R.JS OPTIMIZER!
      // Preloading must finish before gameController gets included at all.
      require(["base/gameManager"], function(game) {
        game.init();
      });
    }
  }
);