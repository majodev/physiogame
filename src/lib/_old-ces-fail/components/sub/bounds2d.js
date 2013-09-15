define(["appConfig"],
  function(appConfig) {
    return {
      bounds: {
        x: 0,
        y: 0,
        width: appConfig.get("width"),
        height: appConfig.get("height"),
      }
    };
  }
);