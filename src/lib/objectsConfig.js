define(["Backbone", "underscore", "objectsMap"],
  function(Backbone, _, objectsMap) {

    var AppConfig = Backbone.Model.extend({
      generateKeyValuePairs: function() {
        var json = this.toJSON();
        var keyArray = _.keys(this.toJSON());
        var returnArray = [];
        var i = 0,
          len = keyArray.length;

        for (i; i < len; i += 1) {
          returnArray.push({
            objectKey: keyArray[i],
            objectValue: Math.round(json[keyArray[i]] * 1000) / 1000,
            objectMin: objectsMap[keyArray[i]].min,
            objectMax: objectsMap[keyArray[i]].max,
            objectStep: objectsMap[keyArray[i]].step,
            objectDef: objectsMap[keyArray[i]].def,
            objectDesc: objectsMap[keyArray[i]].desc,
          });
        }

        return {
          keyValues: returnArray
        };
      },
      defaults: {
        objectsToSpawn: objectsMap.objectsToSpawn.def,
        cloudsToGenerate: objectsMap.cloudsToGenerate.def,
        objectHittedScaleCap: objectsMap.objectHittedScaleCap.def,
        objectHittedScaleBeforeCap: objectsMap.objectHittedScaleBeforeCap.def,
        objectHittedScaleAfterCap: objectsMap.objectHittedScaleAfterCap.def,
        objectHittedSpeedMax: objectsMap.objectHittedSpeedMax.def,
        objectHittedSpeedStep: objectsMap.objectHittedSpeedStep.def,
        objectHittedAlphaStep: objectsMap.objectHittedAlphaStep.def,
        objectNormalScaleMin: objectsMap.objectNormalScaleMin.def,
        objectNormalScaleCap: objectsMap.objectNormalScaleCap.def,
        objectNormalScaleBeforeCap: objectsMap.objectNormalScaleBeforeCap.def,
        objectNormalScaleAfterCap: objectsMap.objectNormalScaleAfterCap.def
      }
    });

    var appConfig = new AppConfig();
  

    return appConfig;
  }
);