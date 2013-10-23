define(["base/leapManager", "moment", "gameConfig"],
  function(leapManager, moment, gameConfig) {

    var session = {},
      running = false,
      roundRunning = false;

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
            y: 0,
            z: 0,
            hyp: 0
          },
          inside: {
            x: 0,
            y: 0,
            z: 0,
            hyp: 0
          }
        },
        projection: {
          width: 0,
          height: 0,
          depth: 0
        },
        projectionCenter: {
          x: 0,
          y: 0,
          z: 0
        },
        fingerCountTime: [0, 0, 0, 0, 0, 0] // 5 Fingers + 0 Fingers
      };
    }

    function startSession(startMoment) {
      var rountMoment = moment(startMoment.toDate());
      if (running === true) {
        endSession();
      }

      rountMoment.add("milliseconds", gameConfig.get("introTimerLength"));

      // the lastFrameMoment = the startMoment in beginning!
      reset(rountMoment);

      session.projection = leapManager.getProjectionSizeInMillimeters();
      session.projectionCenter = leapManager.getProjectionCenterInMillimeters();

      leapManager.events.on("frameStats", onLeapFrame);
      running = true;
    }

    function startSessionRound() {
      if (running === true) {
        roundRunning = true;
      }
    }

    function endSession(endMoment) {
      roundRunning = false;
      var lastdiff = 0;

      // turn the events off to frame evaluation.
      leapManager.events.off("frameStats", onLeapFrame);

      // make the last time diff, with notDetected 
      // (when leap wasnt available, this sets it to the whole time!)
      lastdiff = endMoment.diff(session.lastFrameMoment);

      if (lastdiff < 0) {
        // was never in SessionRound!
        lastdiff = 0;
      }

      session.time.notDetected += lastdiff;

      running = false;
    }

    function onLeapFrame(stat) {
      var currentFrameMoment,
        diffTimeToLastFrameMs;
      if (roundRunning) {
        // get the frame moment and the diff
        currentFrameMoment = moment();
        diffTimeToLastFrameMs = currentFrameMoment.diff(session.lastFrameMoment);

        // make session computations...
        computeOffsetTime(stat, diffTimeToLastFrameMs);
        computeFingerCountTime(stat, diffTimeToLastFrameMs);
        computeMovement(stat);

        // remember the moment in session
        session.lastFrameMoment = currentFrameMoment;
      }
    }

    function computeMovement(stat) {
      session.movement.all.x += stat.movement.x;
      session.movement.all.y += stat.movement.y;
      session.movement.all.z += stat.movement.z;
      session.movement.all.hyp += stat.movement.hyp;

      if (stat.outside.left === false &&
        stat.outside.right === false &&
        stat.outside.top === false &&
        stat.outside.bottom === false) {

        // inside
        session.movement.inside.x += stat.movement.x;
        session.movement.inside.y += stat.movement.y;
        session.movement.inside.z += stat.movement.z;
        session.movement.inside.hyp += stat.movement.hyp;
      }
      //console.log(session.movement.all.z);
    }

    function computeFingerCountTime(stat, diffTimeToLastFrameMs) {
      if (stat.fingerCount >= 0 && stat.fingerCount <= 5) {
        session.fingerCountTime[stat.fingerCount] += diffTimeToLastFrameMs;
      }
    }

    function computeOffsetTime(stat, diffTimeToLastFrameMs) {
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


    }

    function getSessionStats() {
      return session;
    }

    return {
      startSession: startSession,
      startSessionRound: startSessionRound,
      endSession: endSession,
      getSessionStats: getSessionStats
    };

  }
);