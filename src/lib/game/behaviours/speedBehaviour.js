define(["utils/applyStepInRange"],
  function(applyStepInRange) {
    function update(layer, gameObject, opt) {
      if (gameObject.hitted === true) {
        
        // apply speed hitted in defined ranges.
        gameObject.speed = applyStepInRange(gameObject.speed,
          opt.objectHittedSpeedMin, opt.objectHittedSpeedMax,
          opt.objectHittedSpeedStep);
      } else {

        // apply speed normal in defined ranges.
        gameObject.speed = applyStepInRange(gameObject.speed,
          opt.objectNormalSpeedMin, opt.objectNormalSpeedMax,
          opt.objectNormalSpeedStep);
      }
    }

    return {
      update: update
    };
  }
);