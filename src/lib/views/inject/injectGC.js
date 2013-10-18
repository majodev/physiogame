define(["base/leapManager", "underscore"],
  function(leapManager, _) {

    // renderJSON.leap.push({
    //       objectKey: projectionWidth,
    //       objectValue: showValue,
    //       objectDef: showDefault,
    //       objectDesc: gameConfigMap[key].desc,
    //       objectOpt: gameConfigMap[key].opt,
    //       uiSlider: (gameConfigMap[key].ui === "slider") ? true : false,
    //       uiDropdown: (gameConfigMap[key].ui === "dropdown") ? true : false,
    //       uiToggle: (gameConfigMap[key].ui === "toggle") ? true : false,
    //       uiText: (gameConfigMap[key].ui === "text") ? true : false
    //     });



    function leapValuesToInject() {
      return [{
        objectKey: "projectionSize",
        objectValue: Math.floor(leapManager.getProjectionSizeInMillimeters().width) + " mm x " + 
          Math.floor(leapManager.getProjectionSizeInMillimeters().height) + " mm",
        objectDesc: "native Projektionsfläche",
        hint: "x <= 640<br />y <= 480",
        uiReadOnly: true
      }, {
        objectKey: "projectionCenter",
        objectValue: "x: " + Math.floor(leapManager.getProjectionCenterInMillimeters().x) + " mm, y: " +
          Math.floor(leapManager.getProjectionCenterInMillimeters().y) + " mm",
        objectDesc: "nativer Projektionsmittelpunkt",
        hint: "-320 <= x <= 320<br />20 >= y >= 500",
        uiReadOnly: true
      }];
    }

    function inject(json) {
      json.leap.keyValues = _.union(json.leap.keyValues, leapValuesToInject());

      return json;
    }

    return {
      inject:inject
    };
  }
);