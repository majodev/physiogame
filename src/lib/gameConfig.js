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
            if (filterCategory === gameConfigMap[keyArray[i]].cat) {
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
          objectValue: formatOut(json[key]),
          objectMin: gameConfigMap[key].min,
          objectMax: gameConfigMap[key].max,
          objectStep: gameConfigMap[key].step,
          objectDef: gameConfigMap[key].def,
          objectDesc: gameConfigMap[key].desc,
          objectOpt: gameConfigMap[key].opt,
          uiSlider: (gameConfigMap[key].ui === "slider") ? true : false,
          uiDropdown: (gameConfigMap[key].ui === "dropdown") ? true : false,
          uiToggle: (gameConfigMap[key].ui === "toggle") ? true : false,
          uiText: (gameConfigMap[key].ui === "text") ? true : false
        };
      },
      getKeyValueCategoryPairs: function() {
        return {
          general: this.generateKeyValuePairs("general"),
          scale: this.generateKeyValuePairs("scale"),
          speed: this.generateKeyValuePairs("speed"),
          alpha: this.generateKeyValuePairs("alpha"),
          leap: this.generateKeyValuePairs("leap")
        };
      },
      resetToDefaultValues: function() {
        var json = this.toJSON();
        var keyArray = _.keys(json);
        var i = 0,
          len = keyArray.length;
        for (i; i < len; i += 1) {
          this.set(keyArray[i], gameConfigMap[keyArray[i]].def);
        }
      },
      validate: function(attrs, options) {
        var attrKeys = _.keys(attrs),
          i = 0,
          len = attrKeys.length;

        for (i; i < len; i += 1) {

          // check if range within defined minimum
          if (_.isUndefined(gameConfigMap[attrKeys[i]].min) === false) {
            if (this.get(attrKeys[i]) < gameConfigMap[attrKeys[i]].min) {
              return gameConfigMap[attrKeys[i]].desc + " ist " +
                formatOut(this.get(attrKeys[i])) + " muss größer sein als " +
                formatOut(gameConfigMap[attrKeys[i]].min);
            }
          }

          // check if range within defined maximum
          if (_.isUndefined(gameConfigMap[attrKeys[i]].max) === false) {
            if (this.get(attrKeys[i]) > gameConfigMap[attrKeys[i]].max) {
              return gameConfigMap[attrKeys[i]].desc + " ist " +
                formatOut(this.get(attrKeys[i])) + " muss kleiner sein als " +
                formatOut(gameConfigMap[attrKeys[i]].max);
            }
          }

          // check cross-variable-checks defined in gameConfigMap
          if (_.isUndefined(gameConfigMap[attrKeys[i]].check) === false) {
            if (_.isUndefined(gameConfigMap[attrKeys[i]].check.min) === false) {
              if (this.get(attrKeys[i]) <= this.get(gameConfigMap[attrKeys[i]].check.min)) {
                return gameConfigMap[attrKeys[i]].desc + " ist " + formatOut(this.get(attrKeys[i])) + " muss größer sein als " +
                  formatOut(this.get(gameConfigMap[attrKeys[i]].check.min)) + "(" +
                  gameConfigMap[gameConfigMap[attrKeys[i]].check.min].desc + ")";
              }
            }
            if (_.isUndefined(gameConfigMap[attrKeys[i]].check.max) === false) {
              if (this.get(attrKeys[i]) >= this.get(gameConfigMap[attrKeys[i]].check.max)) {
                return gameConfigMap[attrKeys[i]].desc + " ist " + formatOut(this.get(attrKeys[i])) + " muss kleiner sein als " +
                  formatOut(this.get(gameConfigMap[attrKeys[i]].check.max)) + " (" +
                  gameConfigMap[gameConfigMap[attrKeys[i]].check.max].desc + ")";
              }
            }

          }
        }
      },
      defaults: {
        objectTexture: gameConfigMap.objectTexture.def,
        debugLayerVisible: gameConfigMap.debugLayerVisible.def,
        introTimerLength: gameConfigMap.introTimerLength.def,
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
        objectNormalSpeedMax: gameConfigMap.objectNormalSpeedMax.def,
        objectNormalSpeedStep: gameConfigMap.objectNormalSpeedStep.def,
        objectHittedSpeedMin: gameConfigMap.objectHittedSpeedMin.def,
        objectHittedSpeedMax: gameConfigMap.objectHittedSpeedMax.def,
        objectHittedSpeedStep: gameConfigMap.objectHittedSpeedStep.def,
        objectNormalAlphaMin: gameConfigMap.objectNormalAlphaMin.def,
        objectNormalAlphaStep: gameConfigMap.objectNormalAlphaStep.def,
        objectHittedAlphaStep: gameConfigMap.objectHittedAlphaStep.def,
        leapShowIndicatorLayer: gameConfigMap.leapShowIndicatorLayer.def,
        leapXModifier: gameConfigMap.leapXModifier.def,
        leapYModifier: gameConfigMap.leapYModifier.def,
        leapToDisplayX: gameConfigMap.leapToDisplayX.def,
        leapToDisplayY: gameConfigMap.leapToDisplayY.def,
        objectHittedScaleExplodes: gameConfigMap.objectHittedScaleExplodes.def
      }
    });

    var appConfig = new AppConfig();

    // helper to format for printable
    function formatOut(value) {
      return (_.isNumber(value)) ? (Math.round(value * 1000) / 1000) : value;
    }


    return appConfig;
  });