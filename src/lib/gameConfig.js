define(["Backbone", "underscore", "gameConfigMap"],
  function(Backbone, _, gameConfigMap) {

    var AppConfig = Backbone.Model.extend({
      generateKeyValuePairs: function() {
        var json = this.toJSON();
        var keyArray = _.keys(json);
        var returnArray = [];
        var i = 0,
          len = keyArray.length;

        for (i; i < len; i += 1) {

          returnArray.push({
            objectKey: keyArray[i],
            objectValue: (_.isNumber(keyArray[i])) ? (Math.round(json[keyArray[i]] * 1000) / 1000) : json[keyArray[i]],
            objectMin: gameConfigMap[keyArray[i]].min,
            objectMax: gameConfigMap[keyArray[i]].max,
            objectStep: gameConfigMap[keyArray[i]].step,
            objectDef: gameConfigMap[keyArray[i]].def,
            objectDesc: gameConfigMap[keyArray[i]].desc,
            objectOpt: gameConfigMap[keyArray[i]].opt,
            uiSlider: (gameConfigMap[keyArray[i]].ui === "slider") ? true : false,
            uiDropdown: (gameConfigMap[keyArray[i]].ui === "dropdown") ? true : false,
            uiCheckbox: (gameConfigMap[keyArray[i]].ui === "checkbox") ? true : false,
            uiText: (gameConfigMap[keyArray[i]].ui === "text") ? true : false
          });
        }

        //console.dir(returnArray);

        return {
          keyValues: returnArray
        };
      },
      // randomizeSettings: function() {
      //   var json = this.toJSON();
      //   var keyArray = _.keys(json);
      //   var i = 0,
      //     len = keyArray.length;

      //   for (i; i < len; i += 1) {

      //     //this.set(keyArray[i], _.random());
      //   }
      // },
      defaults: {
        objectTexture: gameConfigMap.objectTexture.def,
        objectsToSpawn: gameConfigMap.objectsToSpawn.def,
        cloudsToGenerate: gameConfigMap.cloudsToGenerate.def,
        objectNormalScaleMin: gameConfigMap.objectNormalScaleMin.def,
        objectNormalScaleCap: gameConfigMap.objectNormalScaleCap.def,
        objectNormalScaleBeforeCap: gameConfigMap.objectNormalScaleBeforeCap.def,
        objectNormalScaleAfterCap: gameConfigMap.objectNormalScaleAfterCap.def,
        objectHittedScaleCap: gameConfigMap.objectHittedScaleCap.def,
        objectHittedScaleBeforeCap: gameConfigMap.objectHittedScaleBeforeCap.def,
        objectHittedScaleAfterCap: gameConfigMap.objectHittedScaleAfterCap.def,
        objectNormalSpeedMin: gameConfigMap.objectNormalSpeedMin.def,
        objectHittedSpeedMax: gameConfigMap.objectHittedSpeedMax.def,
        objectHittedSpeedStep: gameConfigMap.objectHittedSpeedStep.def,
        objectNormalAlphaMin: gameConfigMap.objectNormalAlphaMin.def,
        objectNormalAlphaStep: gameConfigMap.objectNormalAlphaStep.def,
        objectHittedAlphaStep: gameConfigMap.objectHittedAlphaStep.def
      }
    });

    var appConfig = new AppConfig();
  

    return appConfig;
  }
);