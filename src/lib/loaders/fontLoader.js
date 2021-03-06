define(["log", "WebFont", "utils/publisher", "appConfig", "underscore",
  "loaders/status"],
  function(log, WebFont, publisher, appConfig, _,
    status) {

    var events = publisher.make(),
      fontConfig = _.extend(appConfig.get("fonts"), {
        loading: function() {
          //log.debug("fonts: loading");
        },
        active: function() {
          //log.debug("fonts: active, all loaded!");
          events.trigger("allFontsLoaded");
        },
        inactive: function() {
          //log.debug("fonts: inactive");
        },
        fontloading: function(familyName, fvd) {
          //log.debug("fonts: fontloading " + familyName);
        },
        fontactive: function(familyName, fvd) {
          //console.dir(familyName);
          //console.dir(fvd);
          log.debug("font loaded: " + familyName + ", " + fvd);
          status.touch();
          //status.write("fonts: loaded " + familyName + ", " + fvd);
        },
        fontinactive: function(familyName, fvd) {
          //log.debug("fonts: fontinactive " + familyName);
        }
      });

    function init() {
      WebFont.load(fontConfig);
    }

    return {
      init: init,
      events: events
    };
  }
);