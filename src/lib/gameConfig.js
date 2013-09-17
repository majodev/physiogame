define(["Backbone", "underscore", "gameConfigMap"],
  function(Backbone, _, gameConfigMap) {

    var AppConfig = Backbone.Model.extend({
      generateKeyValuePairs: function(filterCategory) { // optional filter
        var json = this.toJSON();
        var keyArray = _.keys(json);
        var returnArray = [];
        var i = 0,
          len = keyArray.length;

        for (i; i < len; i += 1) {
          if (_.isUndefined(filterCategory) === false) {
            if(filterCategory === gameConfigMap[keyArray[i]].cat) {
              returnArray.push(this.getKeyValuePair(keyArray[i], json));
            }
          } else {
            returnArray.push(this.getKeyValuePair(keyArray[i], json));
          }          
        }
        return {
          keyValues: returnArray
        };
      },
      getKeyValuePair: function(key, json) {
        return {
          objectKey: key,
          objectValue: (_.isNumber(json[key])) ? (Math.round(json[key] * 1000) / 1000) : json[key],
          objectMin: gameConfigMap[key].min,
          objectMax: gameConfigMap[key].max,
          objectStep: gameConfigMap[key].step,
          objectDef: gameConfigMap[key].def,
          objectDesc: gameConfigMap[key].desc,
          objectOpt: gameConfigMap[key].opt,
          uiSlider: (gameConfigMap[key].ui === "slider") ? true : false,
          uiDropdown: (gameConfigMap[key].ui === "dropdown") ? true : false,
          uiCheckbox: (gameConfigMap[key].ui === "checkbox") ? true : false,
          uiText: (gameConfigMap[key].ui === "text") ? true : false
        };
      },
      getKeyValueCategoryPairs: function () {
        return {
          general: this.generateKeyValuePairs("general"),
          scale: this.generateKeyValuePairs("scale"),
          speed: this.generateKeyValuePairs("speed"),
          alpha: this.generateKeyValuePairs("alpha"),
          leap: this.generateKeyValuePairs("leap")
        };
      },
      resetToDefaultValues: function () {
        var json = this.toJSON();
        var keyArray = _.keys(json);
        var i = 0,
          len = keyArray.length;
        for (i; i < len; i += 1) {
          this.set(keyArray[i], gameConfigMap[keyArray[i]].def);
        }
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
        objectHittedAlphaStep: gameConfigMap.objectHittedAlphaStep.def,
        leapXModifier: gameConfigMap.leapXModifier.def,
        leapYModifier: gameConfigMap.leapYModifier.def,
        leapToDisplayX: gameConfigMap.leapToDisplayX.def,
        leapToDisplayY: gameConfigMap.leapToDisplayY.def,
        objectHittedScaleExplodes: gameConfigMap.objectHittedScaleExplodes.def,
        objectNormalSpeedStep: gameConfigMap.objectNormalSpeedStep.def
      }
    });

    var appConfig = new AppConfig();


    return appConfig;
  }
);