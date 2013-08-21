define(["Leap", "utils/eventPublisher"],
  function(Leap, eventPublisher) {

    // private 
    var controller = new Leap.Controller(),
      frameCount = 0,
      handsAvailable = false,
      handsLength = 0,
      events = eventPublisher(["handFrame", "debugInfo"]);

    // per frame from leap
    controller.on("frame", function(frame) {

      var handId = 0,
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

        events.fire("handFrame", {
          x: parseInt(hand.palmPosition[0], 10),
          y: parseInt(hand.palmPosition[1], 10),
          z: parseInt(hand.palmPosition[2], 10)
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

    //(function init() {
    console.log("leap: init");
    controller.connect();
    //}());

    // public
    return {
      getHandsAvailable: function() {
        return handsAvailable;
      },
      getHandsLength: function() {
        return handsLength;
      },
      events: events
    };
  }
);