define(["Leap", "config", "utils/eventPublisher"],
  function(Leap, config, eventPublisher) {

    // private 
    var controller = new Leap.Controller(),
      frameCount = 0,
      handsAvailable = false,
      handsLength = 0,
      events = eventPublisher(["handFrameNormalized", "debugInfo"]),
      displayWidth = config.width,
      displayHeight = config.height;

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

        events.fire("handFrameNormalized", {
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
      events.fire("debugInfo", debugText);
      frameCount = 0;
    }, 2000);

    function init() {
      console.log("leapController: init");
      controller.connect();

      events.fire("init");
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