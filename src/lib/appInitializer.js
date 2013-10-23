/**
 * @license
 * Physiogame <https://github.com/majodev/physiogame>
 * Copyright 2013 Mario Ranftl (@majodev) <http://majodev.com>
 * Available under GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007
 */
define(["appConfig", "log", "loaders/preloader", "loaders/indicator",
  "loaders/status"],
  function(appConfig, log, preloader, indicator,
    status) {

    (function preloading() {

      status.write("\nLade Assets");
      indicator.enable();

      log.setLevel(appConfig.get("logLevel"));
      log.debug("self executing startup function - preloading, logLevel is " +
        appConfig.get("logLevel"));

      preloader.events.on("preloadedAll", preloadingFinished);
      preloader.init();
    }());

    function preloadingFinished() {

      log.debug("preloadingFinished");
      status.write("\n\nInitialisiere " + appConfig.get("applicationName"));

      // dynamic require! - dont forget to INCLUDE within build options
      // THIS IS NOT SEEN BY THE R.JS OPTIMIZER!
      // Preloading must finish before gameManager gets included at all.
      require(["base/gameManager"], function(game) {
        game.init();
        indicator.disable();
        status.clear();
      });

    }
  }
);