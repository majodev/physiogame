define(["base/leapManager", "underscore", "i18n"],
  function(leapManager, _, i18n) {

    function leapValuesToInject() {
      return [{
        objectKey: "projectionSize",
        objectValue: Math.floor(leapManager.getProjectionSizeInMillimeters().width) + " x " + 
          Math.floor(leapManager.getProjectionSizeInMillimeters().height) + " x " +
          Math.floor(leapManager.getProjectionSizeInMillimeters().depth) + " mm",
        objectDesc: i18n.t("nativeProjectionArea"),
        hint: "x <= 640<br />y <= 480<br />z <= 180",
        uiReadOnly: true
      }, {
        objectKey: "projectionCenter",
        objectValue: "x: " + Math.floor(leapManager.getProjectionCenterInMillimeters().x) + "; y: " +
          Math.floor(leapManager.getProjectionCenterInMillimeters().y) + "; z: " + 
          Math.floor(leapManager.getProjectionCenterInMillimeters().z) + " mm",
        objectDesc: i18n.t("nativeProjectionCenter"),
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