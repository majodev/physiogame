define([],
  function() {
    function applyStepInRange(currentValue, min, max, step) {
      var newValue = currentValue;

      // apply for minimum and negative step
      if (newValue > min && step < 0) {
        newValue += step;
        if (newValue < min) {
          newValue = min;
        }
      }

      // apply for maximum and positive step
      if (newValue < max && step > 0) {
        newValue += step;
        if (newValue > max) {
          newValue = max;
        }
      }

      return newValue;
    }

    return applyStepInRange;
  }
);