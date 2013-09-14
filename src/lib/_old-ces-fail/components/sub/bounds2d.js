define(["config"],
  function(config) {
    return {
      bounds: {
        x: 0,
        y: 0,
        width: config.get("width"),
        height: config.get("height"),
      }
    };
  }
);