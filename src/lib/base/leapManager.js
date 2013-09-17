define(["log", "Leap", "appConfig", "utils/publisher", "Poll", "gameConfig"],
  function(log, Leap, appConfig, publisher, Poll, gameConfig) {

    // private 
    var controller = new Leap.Controller(),
      frameCount = 0,
      handsAvailable = false,
      handsLength = 0,
      events = publisher.make(),
      displayWidth = appConfig.get("width"),
      displayHeight = appConfig.get("height"),
      leapXModifier = gameConfig.get("leapXModifier"),
      leapYModifier = gameConfig.get("leapYModifier"),
      leapToDisplayX = gameConfig.get("leapToDisplayX"),
      leapToDisplayY = gameConfig.get("leapToDisplayY");

    appConfig.on("change", appConfigChanged);
    gameConfig.on("change", gameConfigChanged);

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
            x: (displayWidth / leapToDisplayX + (x * leapXModifier)),
            y: (displayHeight * leapToDisplayY - (y * leapYModifier))
          }
        });

      }

      frameCount += 1;
    });

    function init() {
      log.debug("leapController: init");
      controller.connect();

      Poll.start({
        name: "debugLeap",
        interval: 2000,
        action: function() {
          var time = frameCount / 2,
            // debugText = "leap: " + frameCount + " frames @ " +
            //   time + "fps.";
            debugText = "leap @ " + time + "fps";
          events.trigger("debugInfo", debugText);
          frameCount = 0;
        }
      });

      events.trigger("init");
    }

    function gameConfigChanged(model, options) {
      leapXModifier = gameConfig.get("leapXModifier");
      leapYModifier = gameConfig.get("leapYModifier");
      leapToDisplayX = gameConfig.get("leapToDisplayX");
      leapToDisplayY = gameConfig.get("leapToDisplayY");
    }

    function appConfigChanged(model, options) {
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