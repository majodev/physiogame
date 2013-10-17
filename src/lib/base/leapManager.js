define(["log", "Leap", "appConfig", "utils/publisher", "Poll", "gameConfig"],
  function(log, Leap, appConfig, publisher, Poll, gameConfig) {

    // private 
    var controller = new Leap.Controller(),
      frameCount = 0,
      handsAvailable = false,
      outsideScreen,
      handsLength = 0,
      attachedListeners = false,
      events = publisher.make(),
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
      if(attachedListeners === false) {
        // attach per frame Eventlistener
        controller.on("frame", perFrame);
        attachedListeners = true;
      }
    }

    function deattachListeners() {
      if(attachedListeners === true) {
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

      events.trigger("frameStats", {
        detected: handsAvailable,
        outside: outsideScreen
      });

      frameCount += 1;
    }

    function computePosition(x, y) {

      var position = {
        x: (displayWidth / leapToDisplayX + (x * leapXModifier)),
        y: (displayHeight * leapToDisplayY - (y * leapYModifier))
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

          if(attachedListeners === false) {
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