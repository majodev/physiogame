define(["Leap", "config", "Backbone", "underscore"],
  function(Leap, config, Backbone, _) {

    // private 
    var controller = new Leap.Controller(),
      frameCount = 0,
      handsAvailable = false,
      handsLength = 0,
      events = _.clone(Backbone.Events),
      displayWidth = config.get("width"),
      displayHeight = config.get("height");

    config.on("change", configChanged);

    // per frame from leap
    controller.on("frame", function(frame) {

      var handId = 0,
        x = 0,
        y = 0,
        hand;

      if (frame.hands === undefined) {
        handsAvailable = false;
      } else {
        handsLength = frame.hands.length;
        if (handsLength > 0) {
          handsAvailable = true;
        } else {
          handsAvailable = false;
        }
      }

      for (handId, handCount = handsLength; handId != handCount; handId += 1) {

        hand = frame.hands[handId];

        x = parseInt(hand.palmPosition[0], 10);
        y = parseInt(hand.palmPosition[1], 10);

        events.trigger("handFrameNormalized", {
          position: {
            x: (displayWidth / 2 + (x * 2.5)),
            y: ((displayHeight / 3) * 4 - (y * 2))
          }
        });

      }

      frameCount += 1;
    });

    // per interval ms
    setInterval(function() {
      var time = frameCount / 2,
        debugText = "leap: received " + frameCount + " frames @ " +
          time + "fps.";
      events.trigger("debugInfo", debugText);
      frameCount = 0;
    }, 2000);

    function init() {
      console.log("leapController: init");
      controller.connect();

      events.trigger("init");
    }

    function configChanged(model, options) {
      displayWidth = model.get("width");
      displayHeight = model.get("height");
    }

    function getHandsAvailable() {
      return handsAvailable;
    }

    function getHandsLength() {
      return handsLength;
    }

    // public
    return {
      init: init,
      getHandsAvailable: getHandsAvailable,
      getHandsLength: getHandsLength,
      events: events
    };
  }
);