define(["log", "WebFont", "utils/publisher", "config", "underscore"],
  function(log, WebFont, publisher, config, _) {

    var events = publisher.make(),
      fontConfig = _.extend(config.get("fonts"), {
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
          log.debug("font loaded: " + familyName + ", " + fvd);
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