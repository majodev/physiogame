define(["log", "Leap", "appConfig", "utils/publisher", "Poll", "gameConfig",
    "underscore"
  ],
  function(log, Leap, appConfig, publisher, Poll, gameConfig,
    _) {

    // private 
    var controller = new Leap.Controller(),
      frameCount = 0,
      handsAvailable = false,
      outsideScreen,
      movement = {
        x: 0,
        y: 0,
        hyp: 0
      },
      handsLength = 0,
      attachedListeners = false,
      events = publisher.make(),
      lastHand,
      displayWidth = appConfig.get("width"),
      displayHeight = appConfig.get("height"),
      leapXModifier = gameConfig.get("leapXModifier"),
      leapYModifier = gameConfig.get("leapYModifier"),
      leapToDisplayX = gameConfig.get("leapToDisplayX"),
      leapToDisplayY = gameConfig.get("leapToDisplayY");

    appConfig.on("change", appConfigChanged);
    gameConfig.on("change", gameConfigChanged);

    controller.on("ready", function() {
      log.debug("leap: ready");
      attachListeners();
    });
    controller.on("deviceConnected", function() {
      log.debug("leap: deviceConnected");
      attachListeners();
    });
    controller.on("deviceDisconnected", function() {
      log.debug("leap: deviceDisconnected");
      deattachListeners();
    });

    function attachListeners() {
      if (attachedListeners === false) {
        // attach per frame Eventlistener
        controller.on("frame", perFrame);
        attachedListeners = true;
      }
    }

    function deattachListeners() {
      if (attachedListeners === true) {
        // dettach per frame Eventlistener
        controller.removeListener("frame", perFrame);
        attachedListeners = false;
      }
    }

    function perFrame(frame) {
      var handId = 0,
        position,
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

      if (handsAvailable) {
        hand = frame.hands[0];

        position = computePosition(hand.palmPosition[0],
          hand.palmPosition[1]);

        events.trigger("handFrameNormalized", {
          position: position
        });
      }

      validateOutsideScreen(handsAvailable);
      computeMovement(handsAvailable, hand);

      // hand over the stats for listeners to make work...
      events.trigger("frameStats", {
        detected: handsAvailable,
        outside: outsideScreen,
        movement: movement
      });

      lastHand = hand;
      frameCount += 1;
    }

    function validateOutsideScreen(handsAvailable) {
      if (handsAvailable === false) {
        // when no hands were tracked, set outsideScreen to false as computePosition couldn't parse anything
        outsideScreen = {
          left: false,
          right: false,
          top: false,
          bottom: false
        };
      }
    }

    function computeMovement(handsAvailable, hand) {

      if (handsAvailable === true) {
        if (_.isUndefined(lastHand) === false) {

          movement.x = getLeapDistanceBetweenX(hand.palmPosition[0], lastHand.palmPosition[0]);
          movement.y = getLeapDistanceBetweenY(hand.palmPosition[1], lastHand.palmPosition[1]);
          movement.hyp = getHypotenuse(movement.x, movement.y);

        } else {
          movement = {
            x: 0,
            y: 0,
            hyp: 0
          };
        }
      }

    }

    function leapXToNormalize(x) {
      return (displayWidth / leapToDisplayX) + (x * leapXModifier);
    }

    function leapYToNormalize(y) {
      return (displayHeight * leapToDisplayY) - (y * leapYModifier);
    }

    function normalizedXToLeap(x) {
      return (x - (displayWidth / leapToDisplayX)) / leapXModifier;
    }

    function normalizedYToLeap(y) {
      return (y - (displayHeight / leapToDisplayY)) / leapYModifier;
    }

    function getProjectionSizeInMillimeters() {
      return {
        width: getLeapDistanceBetweenX(normalizedXToLeap(0),
          normalizedXToLeap(displayWidth)),
        height: getLeapDistanceBetweenY(normalizedYToLeap(0),
          normalizedYToLeap(displayHeight))
      };
    }

    function getHypotenuse(a, b) {
      return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    }

    function getLeapDistanceBetweenX(x1, x2) {
      var distanceX = 0;
      // x movement, anchor at 0!
      if (x1 < 0) {
        if (x2 >= 0) { // new < 0 <= old
          distanceX = Math.abs(x1) + x2;
        } else { // new < 0 && old < 0 
          distanceX = Math.abs(Math.abs(x1) - Math.abs(x2));
        }
      } else {
        if (x2 >= 0) { // new >= 0 && old >= 0
          distanceX = Math.abs(x1 - x2);
        } else { // old < 0 <= new
          distanceX = Math.abs(x2) + x1;
        }
      }
      return distanceX;
    }

    function getLeapDistanceBetweenY(y1, y2) {
      // y movement, always positive!
      return Math.abs(y1 - y2);
    }

    function computePosition(x, y) {

      var position = {
        x: leapXToNormalize(x),
        y: leapYToNormalize(y)
      };

      outsideScreen = {
        left: false,
        right: false,
        top: false,
        bottom: false
      };

      if (position.x < 0) {
        outsideScreen.left = true;
      }

      if (position.x > displayWidth) {
        outsideScreen.right = true;
      }

      if (position.y < 0) {
        outsideScreen.top = true;
      }

      if (position.y > displayHeight) {
        outsideScreen.bottom = true;
      }

      return position;
    }

    function init() {
      log.debug("leapController: init");
      controller.connect();

      Poll.start({
        name: "debugLeap",
        interval: 2000,
        action: function() {
          var time = frameCount / 2,
            debugText = "leap @ " + time + "fps";

          if (attachedListeners === false) {
            debugText = "no leap connected.";
          }

          events.trigger("debugInfo", debugText);
          frameCount = 0;
        }
      });

      events.trigger("init");
    }

    function gameConfigChanged(model, options) {
      leapXModifier = model.get("leapXModifier");
      leapYModifier = model.get("leapYModifier");
      leapToDisplayX = model.get("leapToDisplayX");
      leapToDisplayY = model.get("leapToDisplayY");
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

    function getOutsideScreen() {
      return outsideScreen;
    }

    function getLeapConnected() {
      return attachedListeners;
    }

    // public
    return {
      init: init,
      getLeapConnected: getLeapConnected,
      getHandsAvailable: getHandsAvailable,
      getHandsLength: getHandsLength,
      getOutsideScreen: getOutsideScreen,
      events: events
    };
  }
);