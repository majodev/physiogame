define(["base/leapManager", "moment"],
  function(leapManager, moment) {

    var session = {},
      running = false;

    function reset(startMoment) {
      session = {
        lastFrameMoment: startMoment,
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
        },
        movement: {
          all: {
            x: 0,
            y: 0
          },
          inside: {
            x: 0,
            y: 0
          }
        }
      };
    }

    function startSession(startMoment) {
      if (running === true) {
        endSession();
      }

      // the lastFrameMoment = the startMoment in beginning!
      reset(startMoment);

      leapManager.events.on("frameStats", onLeapFrame);
      running = true;
    }

    function endSession(endMoment) {
      var lastdiff = 0;

      // turn the events off to frame evaluation.
      leapManager.events.off("frameStats", onLeapFrame);

      // make the last time diff, with notDetected 
      // (when leap wasnt available, this sets it to the whole time!)
      lastdiff = endMoment.diff(session.lastFrameMoment);
      session.time.notDetected += lastdiff;

      running = false;
    }

    function onLeapFrame(stat) {
      computeOffsetTime(stat);
      computeMovement(stat);
    }

    function computeMovement(stat) {
      session.movement.all.x += stat.movement.x;
      session.movement.all.y += stat.movement.y;

      if (stat.outside.left === false &&
        stat.outside.right === false &&
        stat.outside.top === false &&
        stat.outside.bottom === false) {

        // inside
        session.movement.inside.x += stat.movement.x;
        session.movement.inside.y += stat.movement.y;
      }
    }

    function computeOffsetTime(stat) {
      var currentFrameMoment = moment(),
        diffTimeToLastFrameMs = 0;

      // compute the diff between current and last...
      diffTimeToLastFrameMs = currentFrameMoment.diff(session.lastFrameMoment);


      // evaluate the stat object from leap and our sessionStat
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