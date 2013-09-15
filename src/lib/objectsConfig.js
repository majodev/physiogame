define(["Backbone"],
  function(Backbone) {
    var appConfig = new Backbone.Model({
      objectsToSpawn: 100,
      cloudsToGenerate: 50,
      objectHittedScaleCap: 1,
      objectHittedScaleBeforeCap: 0.12,
      objectHittedScaleAfterCap: 0.08,
      objectHittedSpeedMax: 5,
      objectHittedSpeedStep: 1,
      objectHittedAlphaStep: 0.2,
      objectNormalScaleMin: 0.25,
      objectNormalScaleCap: 0.9,
      objectNormalScaleBeforeCap: 0.02,
      objectNormalScaleAfterCap: 0.003
    });
    return appConfig;
  }
);