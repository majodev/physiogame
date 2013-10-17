define(["base/leapManager", "moment"],
  function(leapManager, moment) {

    var session = {},
      running = false;

    function reset() {
      session = {
        lastFrameMoment: false,
        time: {
          detected: 0,
          notDetected: 0,
          outside: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            any: 0
          },
          inside: 0
        }
      };
    }

    function startSession() {
      if (running === true) {
        endSession();
      }

      reset();
      leapManager.events.on("frameStats", onLeapFrame);
      running = true;
    }

    function endSession() {
      leapManager.events.off("frameStats", onLeapFrame);
      running = false;
    }

    function onLeapFrame(stat) {

      var currentFrameMoment = moment(),
        diffTimeToLastFrameMs = 0;

      if (session.lastFrameMoment === false) {
        // got the first frame in this whole session.
        session.lastFrameMoment = currentFrameMoment;
        diffTimeToLastFrameMs = 0;
      } else {
        // compute the diff between current and last...
        diffTimeToLastFrameMs = currentFrameMoment.diff(session.lastFrameMoment);
      }

      if (stat.detected === true) {
        session.time.detected += diffTimeToLastFrameMs;

        // directions....
        if (stat.outside.left === true) {
          session.time.outside.left += diffTimeToLastFrameMs;
        }
        if (stat.outside.right === true) {
          session.time.outside.right += diffTimeToLastFrameMs;
        }
        if (stat.outside.top === true) {
          session.time.outside.top += diffTimeToLastFrameMs;
        }
        if (stat.outside.bottom === true) {
          session.time.outside.bottom += diffTimeToLastFrameMs;
        }

        if (stat.outside.left === false &&
          stat.outside.right === false &&
          stat.outside.top === false &&
          stat.outside.bottom === false) {
          session.time.inside += diffTimeToLastFrameMs;
        } else {
          session.time.outside.any += diffTimeToLastFrameMs;
        }

      } else {
        session.time.notDetected += diffTimeToLastFrameMs;
      }

      // remember the moment in session
      session.lastFrameMoment = currentFrameMoment;
    }

    function getSessionStats() {
      return session;
    }

    return {
      startSession: startSession,
      endSession: endSession,
      getSessionStats: getSessionStats
    };

  }
);