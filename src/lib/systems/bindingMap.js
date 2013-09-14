define(["systems/bindings/randomScale", "systems/bindings/randomRotation"],
  function(randomScale, randomRotation) {
    return {
      randomScale: randomScale,
      randomRotation: randomRotation
    };
  }
);