/**
 * @license
 * Physiogame <https://github.com/majodev/physiogame>
 * Copyright 2013 Mario Ranftl (@majodev) <http://majodev.com>
 * Available under GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007
 */
define(["appConfig", "log", "loaders/preloader", "loaders/indicator",
    "loaders/status", "i18n", "jquery", "Handlebars"
  ],
  function(appConfig, log, preloader, indicator,
    status, i18n, $, Handlebars) {

    (function preloading() {

      // set log levels....
      log.setLevel(appConfig.get("logLevel"));
      log.debug("self executing startup function - preloading, logLevel is " +
        appConfig.get("logLevel"));

      indicator.enable();

      status.write("... (language loading | Sprache wird geladen) ...");

      // i18next init...
      $.i18n.init({
        ns: "messages",
        lowerCaseLng: true,
        fallbackLng: "en",
        customLoad: function(lng, ns, options, loadComplete) {
          var url = window.location.origin + window.location.pathname + "locales/" + ns + "." + lng + ".json";
          $.ajax({
            url: url,
            success: function(res) {
              loadComplete(null, res);
            },
            error: function(err) {
              if (err.status == 200) {
                // file loaded but invalid json, stop waste time !
                log.error("i18n: Invalid .json in locales " + url);
              } else if (err.status == 404) {
                // locale missing
                log.error("i18n: Locale not found: " + url);
              } else {
                log.error("i18n: " + err.status + " when loading " + url);
              }
              loadComplete(err, null);
            }
          });
        }
      }, function(t) {

        // register handlebars helper to add i18n to templates...
        Handlebars.registerHelper('i18n', function(i18n_key) {
          var result = i18n.t(i18n_key);
          return new Handlebars.SafeString(result);
        });

        // i18next finished, continue loading up application...
        log.debug("i18n: current language: " + i18n.lng());
        status.write(i18n.t("languageLoaded"));

        // preloading assets....
        status.write(i18n.t("loadingAssets"));

        preloader.events.on("preloadedAll", preloadingFinished);
        preloader.init();
      });



    }()); // preloading!

    function preloadingFinished() {

      log.debug("preloadingFinished");
      status.write("\n\n" + i18n.t("init") + " " + appConfig.get("applicationName"));

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