define(["systems/bindings/randomScale", "systems/bindings/randomRotation",
  "systems/bindings/randomTargetX", "systems/bindings/randomTargetY"],
  function(randomScale, randomRotation,
    randomTargetX, randomTargetY) {
    return {
      randomScale: randomScale,
      randomRotation: randomRotation,
      randomTargetX: randomTargetX,
      randomTargetY: randomTargetY
    };
  }
);