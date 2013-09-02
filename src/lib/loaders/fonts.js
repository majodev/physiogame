define(["WebFont", "utils/publisher"],
  function(WebFont, publisher) {

    var events = publisher,
      fontConfig = {
        google: {
          families: ['Arvo:400,700,400italic,700italic:latin']
        },
        loading: function() {
          console.log("fonts: loading");
        },
        active: function() {
          console.log("fonts: active");
          events.trigger("fontsLoaded");
        },
        inactive: function() {
          console.log("fonts: inactive");
        },
        fontloading: function(familyName, fvd) {
          console.log("fonts: fontloading " + familyName);
        },
        fontactive: function(familyName, fvd) {
          console.log("fonts: fontactive " + familyName);
        },
        fontinactive: function(familyName, fvd) {
          console.log("fonts: fontinactive " + familyName);
        }
      };

    function init() {
      WebFont.load(fontConfig);
    }

    return {
      init: init,
      events: events
    };
  }
);