define(["backbone", "underscore", "gameConfigMap",
    "utils/timeFormatter"
  ],
  function(Backbone, _, gameConfigMap,
    timeFormatter) {

    var AppConfig = Backbone.Model.extend({
      generateKeyValuePairs: function(filterCategory) { // optional filter
        var json = this.toJSON();
        var keyArray = _.keys(json);
        var returnArray = [];
        var i = 0,
          len = keyArray.length,
          value;

        for (i; i < len; i += 1) {
          if (_.isUndefined(filterCategory) === false) {
            if (filterCategory === gameConfigMap[keyArray[i]].cat) {
              value = this.getKeyValuePair(keyArray[i], json);
              if (value !== false) {
                returnArray.push(value);
              }
            }
          } else {
            value = this.getKeyValuePair(keyArray[i], json);
            if (value !== false) {
              returnArray.push(value);
            }
          }
        }
        return {
          keyValues: returnArray
        };
      },
      getKeyValuePair: function(key, json) {

        var showValue = stripNumberPrecision(json[key]),
          showDefault = gameConfigMap[key].def,
          formattedValue = this.getFormattedValueIfNeeded(key, showValue);

        // if a formatted value was received apply it also the the default
        if (formattedValue !== false) {
          showDefault = this.getFormattedValueIfNeeded(key, showDefault);
        }

        // check if variable should be even returned (enabled flag in gameConfigMap)
        if (this.checkKeyIsEnabled(key) === false) {
          return false;
        }

        // handle objectValues different if target is a uiDropDown
        if (gameConfigMap[key].ui === "dropdown") {
          // get the desc from the opt array of the current value...
          for (var i = 0; i < gameConfigMap[key].opt.length; i += 1) {
            if (showValue === gameConfigMap[key].opt[i].id) {
              showValue = gameConfigMap[key].opt[i].desc;
            }
            if (showDefault === gameConfigMap[key].opt[i].id) {
              showDefault = gameConfigMap[key].opt[i].desc;
            }
          }
        }

        return {
          objectKey: key,
          objectValue: showValue,
          objectFormattedValue: formattedValue,
          objectMin: gameConfigMap[key].min,
          objectMax: gameConfigMap[key].max,
          objectStep: gameConfigMap[key].step,
          objectDef: showDefault,
          objectDesc: gameConfigMap[key].desc,
          objectOpt: gameConfigMap[key].opt,
          uiSlider: (gameConfigMap[key].ui === "slider") ? true : false,
          uiDropdown: (gameConfigMap[key].ui === "dropdown") ? true : false,
          uiToggle: (gameConfigMap[key].ui === "toggle") ? true : false,
          uiText: (gameConfigMap[key].ui === "text") ? true : false
        };
      },
      checkKeyIsEnabled: function(key) {

        // check if variable should be even returned (enabled flag in gameConfigMap)
        if (_.isUndefined(gameConfigMap[key].enabled) === false) {

          // check if this configItem should be returned
          if (this.get(gameConfigMap[key].enabled.id) !== gameConfigMap[key].enabled.value) {
            // enabled flag condition not passed, deinclude this configItem!
            return false;
          }
        }

        return true;
      },
      getFormatted: function(key) {

      },
      getFormattedValueIfNeeded: function(key, valueToFormat) {
        var formattedValue = false;

        // toggle ui elements have automatically formatted values...
        if(gameConfigMap[key].ui === "toggle") {
          if(valueToFormat === true) {
            formattedValue = "aktiviert";
          } else {
            formattedValue = "deaktiviert";
          }
        }

        // check the format parameter if formatting for output must be applied
        if (_.isUndefined(gameConfigMap[key].format) === false) {

          formattedValue = valueToFormat;
          
          // time formatting...
          if (_.isUndefined(gameConfigMap[key].format.time) === false) {
            if (gameConfigMap[key].format.time === "sec") {
              formattedValue = timeFormatter.formatSeconds(formattedValue);
            }
            if (gameConfigMap[key].format.time === "milli") {
              formattedValue = timeFormatter.formatMilliseconds(formattedValue);
            }
          }

          // percent formatting...
          if (_.isUndefined(gameConfigMap[key].format.percent) === false) {
            formattedValue = stripNumberPrecision(formattedValue*100);
          }

          // pre value...
          if (_.isUndefined(gameConfigMap[key].format.pre) === false) {
            formattedValue = gameConfigMap[key].format.pre + " " + formattedValue;
          }

          // post value...
          if (_.isUndefined(gameConfigMap[key].format.post) === false) {
            formattedValue = formattedValue + " " + gameConfigMap[key].format.post;
          }
        }

        return formattedValue;
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

          // first check if key is even needed to be validated.
          if (this.checkKeyIsEnabled(attrKeys[i]) === true) {
            // check if range within defined minimum
            if (_.isUndefined(gameConfigMap[attrKeys[i]].min) === false) {
              if (this.get(attrKeys[i]) < gameConfigMap[attrKeys[i]].min) {
                return gameConfigMap[attrKeys[i]].desc + " ist " +
                  stripNumberPrecision(this.get(attrKeys[i])) + " muss größer sein als " +
                  stripNumberPrecision(gameConfigMap[attrKeys[i]].min);
              }
            }

            // check if range within defined maximum
            if (_.isUndefined(gameConfigMap[attrKeys[i]].max) === false) {
              if (this.get(attrKeys[i]) > gameConfigMap[attrKeys[i]].max) {
                return gameConfigMap[attrKeys[i]].desc + " ist " +
                  stripNumberPrecision(this.get(attrKeys[i])) + " muss kleiner sein als " +
                  stripNumberPrecision(gameConfigMap[attrKeys[i]].max);
              }
            }

            // check cross-variable-checks defined in gameConfigMap
            if (_.isUndefined(gameConfigMap[attrKeys[i]].check) === false) {
              if (_.isUndefined(gameConfigMap[attrKeys[i]].check.min) === false) {
                if (this.get(attrKeys[i]) <= this.get(gameConfigMap[attrKeys[i]].check.min)) {
                  return gameConfigMap[attrKeys[i]].desc + " ist " + stripNumberPrecision(this.get(attrKeys[i])) + " muss größer sein als " +
                    stripNumberPrecision(this.get(gameConfigMap[attrKeys[i]].check.min)) + "(" +
                    gameConfigMap[gameConfigMap[attrKeys[i]].check.min].desc + ")";
                }
              }
              if (_.isUndefined(gameConfigMap[attrKeys[i]].check.max) === false) {
                if (this.get(attrKeys[i]) >= this.get(gameConfigMap[attrKeys[i]].check.max)) {
                  return gameConfigMap[attrKeys[i]].desc + " ist " + stripNumberPrecision(this.get(attrKeys[i])) + " muss kleiner sein als " +
                    stripNumberPrecision(this.get(gameConfigMap[attrKeys[i]].check.max)) + " (" +
                    gameConfigMap[gameConfigMap[attrKeys[i]].check.max].desc + ")";
                }
              }
            }
          }
        }
      },
      defaults: {
        objectsToSpawn: gameConfigMap.objectsToSpawn.def,
        gameMode: gameConfigMap.gameMode.def,
        gameMaxTime: gameConfigMap.gameMaxTime.def,
        gameReattachObjectAfterMs: gameConfigMap.gameReattachObjectAfterMs.def,
        gameReattachObjectMax: gameConfigMap.gameReattachObjectMax.def,
        objectTexture: gameConfigMap.objectTexture.def,
        cloudsToGenerate: gameConfigMap.cloudsToGenerate.def,
        introTimerLength: gameConfigMap.introTimerLength.def,
        debugLayerVisible: gameConfigMap.debugLayerVisible.def,
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

    function stripNumberPrecision(value) {
      return (_.isNumber(value)) ? (Math.round(value * 1000) / 1000) : value;
    }


    return appConfig;
  });