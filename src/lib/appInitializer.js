define(["appConfig", "log", "loaders/preloader", "loaders/indicator",
    "loaders/featureDetection", "loaders/status"
  ],
  function(appConfig, log, preloader, indicator,
    featureDetection, status) {

    (function preloading() {

      console.log(featureDetection.report());
      console.log(featureDetection.reportDetails());

      // Feature Detection takes places before...
      if (featureDetection.supported() === false) {
        
        // write report from feature detection...
        status.write(featureDetection.report());

        log.error("environment not supported, doing nothing.");

        // write more details from report...
        status.write("\ndetails:" + featureDetection.reportDetails());

        // finally kill further loading!
        return;
      } else {
        // write loading...
        status.write("preloading...\n");
      }

      indicator.enable();
      log.setLevel(appConfig.get("logLevel"));
      log.debug("self executing startup function - preloading, logLevel is " +
        appConfig.get("logLevel"));

      preloader.events.on("preloadedAll", preloadingFinished);
      preloader.init();
    }());

    function preloadingFinished() {

      log.debug("preloadingFinished");
      status.write("\n initializing application...");

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