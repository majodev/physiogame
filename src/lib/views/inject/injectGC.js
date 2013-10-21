define(["base/leapManager", "underscore"],
  function(leapManager, _) {

    function leapValuesToInject() {
      return [{
        objectKey: "projectionSize",
        objectValue: Math.floor(leapManager.getProjectionSizeInMillimeters().width) + " x " + 
          Math.floor(leapManager.getProjectionSizeInMillimeters().height) + " x " +
          Math.floor(leapManager.getProjectionSizeInMillimeters().depth) + " mm",
        objectDesc: "native Projektionsfläche",
        hint: "x <= 640<br />y <= 480<br />z <= 180",
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