define(["WebFont", "utils/publisher", "config", "underscore"],
  function(WebFont, publisher, config, _) {

    var events = publisher.make(),
      fontConfig = _.extend(config.get("fonts"), {
        loading: function() {
          //console.log("fonts: loading");
        },
        active: function() {
          //console.log("fonts: active, all loaded!");
          events.trigger("fontsLoaded");
        },
        inactive: function() {
          //console.log("fonts: inactive");
        },
        fontloading: function(familyName, fvd) {
          //console.log("fonts: fontloading " + familyName);
        },
        fontactive: function(familyName, fvd) {
          //console.log("fonts: fontactive " + familyName);
        },
        fontinactive: function(familyName, fvd) {
          //console.log("fonts: fontinactive " + familyName);
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