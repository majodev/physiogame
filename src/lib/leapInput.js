define(["Leap"],
  function(Leap) {

    // private 
    var controller = new Leap.Controller(),
      frameCount = 0,
      posX = 0,
      posY = 0,
      handsAvailable = false,
      handsLength = 0;

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
        posX = parseInt(hand.palmPosition[0], 10);
        posY = parseInt(hand.palmPosition[1], 10);
      }

      frameCount += 1;
    });

    // per interval ms
    setInterval(function() {
      var time = frameCount / 2;
      console.log("input: received " + frameCount + " frames @ " +
        time + "fps. (x=" + posX + " y=" + posY + ")");
      frameCount = 0;
    }, 2000);

    (function init() {
      console.log("init");
      controller.connect();
    }());

    // public
    return {
      getLeap: function getLeap() {
        return controller;
      },
      getX: function getX() {
        return posX;
      },
      getY: function getY() {
        return posY;
      },
      getHandsAvailable: function getHandsAvailable() {
        return handsAvailable;
      }
    };
  }
);