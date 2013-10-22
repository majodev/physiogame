define(["log", "Leap", "appConfig", "utils/publisher", "Poll", "gameConfig",
    "underscore"
  ],
  function(log, Leap, appConfig, publisher, Poll, gameConfig,
    _) {

    // private 
    var LEAP_Y_CENTER_POINT = 260, // center of leap mm, 20mm offset of leapbase! // TODO: into gameConfig
      LEAP_Z_MAX = 180, // TODO: into gameConfig, max 180
      LEAP_Z_NORMALIZED_CENTER = 0, // exported as needed for touch/mouse emulation
      LEAP_Z_NORMALIZED_MAX_STEP = 0.1, // exported -...-
      controller = new Leap.Controller(),
      frameCount = 0,
      handsAvailable = false,
      outsideScreen,
      movement = {
        x: 0,
        y: 0,
        z: 0,
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
      leapZModifier = gameConfig.get("leapZModifier"),
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

        //console.log("x=" + Math.floor(hand.palmPosition[0]) + "y=" + Math.floor(hand.palmPosition[1]));

        position = computePosition(hand.palmPosition[0],
          hand.palmPosition[1]);

        events.trigger("handFrameNormalized", {
          leapCoordinates: true,
          fingerCount: hand.fingers.length,
          position: position,
          depth: leapZToNormalize(hand.palmPosition[2])
        });

        //console.log(leapZToNormalize(hand.palmPosition[2]) + " -- " + normalizedZToLeap(leapZToNormalize(hand.palmPosition[2])));
      } else {
        events.trigger("noHand");
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
          movement.z = getLeapDistanceBetweenZ(hand.palmPosition[2], lastHand.palmPosition[2]);

          movement.hyp = get3DHypotenuse(movement.x, movement.y, movement.z);
          return;

        }
      }

      // if not returned already, set movement to empty!
      emptyMovement();

    }

    function emptyMovement() {
      movement = {
        x: 0,
        y: 0,
        z: 0,
        hyp: 0
      };
    }

    // the heart of leap normalizing and frame computing...
    // leapToDisplay -- center point: 0 <= x <= 1
    // eg. width: 0.5 * 1280 = 640
    // eg. height: 0.5 * 720 = 360

    // leapXModifier -- projection modifier = product * orgCord

    // x: -320 <= x <= 320 (640mm)
    // min 2

    function leapXToNormalize(x) {
      if (x >= 0) {
        return (displayWidth * leapToDisplayX) + Math.abs(x * leapXModifier);
      } else {
        return (displayWidth * leapToDisplayX) - Math.abs(x * leapXModifier);
      }
    }

    function normalizedXToLeap(x) {
      return (x - (displayWidth * leapToDisplayX)) / leapXModifier;
    }

    // y: 20 <= y <= 500 (480mm)
    // min 1.5

    function leapYToNormalize(y) {
      if (y >= LEAP_Y_CENTER_POINT) { // constant center at LEAP_Y_CENTER_POINTmm (20mm offset!)
        return (displayHeight * leapToDisplayY) - Math.abs((y - LEAP_Y_CENTER_POINT) * leapYModifier);
      } else {
        return (displayHeight * leapToDisplayY) + Math.abs((y - LEAP_Y_CENTER_POINT) * leapYModifier);
      }
    }

    function normalizedYToLeap(y) {
      return ((-y + (displayHeight * leapToDisplayY)) / leapYModifier) + LEAP_Y_CENTER_POINT;
    }

    // z: -180 <= z <= 180 (320mm)
    // Hard setted through constants as z axis wont be projected completely into our 2d pixi environment

    function leapZToNormalize(z) {

      var zNorm = z;

      if (z > (LEAP_Z_MAX / leapZModifier)) {
        zNorm = (LEAP_Z_MAX / leapZModifier);
      }

      if (z < -(LEAP_Z_MAX / leapZModifier)) {
        zNorm = -(LEAP_Z_MAX / leapZModifier);
      }

      if (z >= 0) {
        return LEAP_Z_NORMALIZED_CENTER + (LEAP_Z_NORMALIZED_MAX_STEP * Math.abs(zNorm / (LEAP_Z_MAX / leapZModifier)));
      } else {
        return LEAP_Z_NORMALIZED_CENTER - (LEAP_Z_NORMALIZED_MAX_STEP * Math.abs(zNorm / (LEAP_Z_MAX / leapZModifier)));
      }
    }

    function normalizedZToLeap(z) {
      return (z - (LEAP_Z_NORMALIZED_CENTER)) / LEAP_Z_NORMALIZED_MAX_STEP * (LEAP_Z_MAX / leapZModifier);
    }


    function getProjectionSizeInMillimeters() {
      return {
        width: getLeapDistanceBetweenX(normalizedXToLeap(0),
          normalizedXToLeap(displayWidth)),
        height: getLeapDistanceBetweenY(normalizedYToLeap(0),
          normalizedYToLeap(displayHeight)),
        depth: getLeapDistanceBetweenZ(normalizedZToLeap(LEAP_Z_NORMALIZED_CENTER - LEAP_Z_NORMALIZED_MAX_STEP),
          normalizedZToLeap(LEAP_Z_NORMALIZED_CENTER + LEAP_Z_NORMALIZED_MAX_STEP))
      };
    }

    function getProjectionCenterInMillimeters() {
      return {
        x: -normalizedXToLeap(displayWidth / 2),
        y: normalizedYToLeap(displayHeight / 2),
        z: 0 // z is always fixed to 0 - makes no sense to change it as area is way to small to move it
      };
    }

    function get3DHypotenuse(a, b, c) {
      return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2));
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

    function getLeapDistanceBetweenZ(z1, z2) {
      // has the same behaviour as a distance computation with x!
      return getLeapDistanceBetweenX(z1, z2);
    }

    // computes the 2d position as needed by pixi stage (comply to width and height)
    function computePosition(x, y) {

      var position = {
        x: leapXToNormalize(x),
        y: leapYToNormalize(y)
      };

      //console.log(position.z + " -- " + normalizedZToLeap(position.z));

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

      //console.log("x=" + position.x + " y=" + position.y);

      return position;
    }

    function init() {
      log.debug("leapManager: init");
      controller.connect();

      Poll.start({
        name: "debugLeap",
        interval: 2000,
        action: function() {
          var time = frameCount / 2,
            debugText = "Leap @ " + time + " fps";
          // debugText += "projection @ " + Math.floor(getProjectionSizeInMillimeters().width) +
          //   " mm x " + Math.floor(getProjectionSizeInMillimeters().height) + " mm";

          if (attachedListeners === false) {
            debugText = "Leap nicht verbunden.";
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
      leapZModifier = model.get("leapZModifier");
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
      getProjectionSizeInMillimeters: getProjectionSizeInMillimeters,
      getProjectionCenterInMillimeters: getProjectionCenterInMillimeters,
      events: events,
      LEAP_Z_NORMALIZED_CENTER: LEAP_Z_NORMALIZED_CENTER,
      LEAP_Z_NORMALIZED_MAX_STEP: LEAP_Z_NORMALIZED_MAX_STEP
    };
  }
);