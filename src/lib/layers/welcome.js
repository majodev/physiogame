define(["PIXI", "display/factory", "config"],
  function(PIXI, factory, config) {
    var layer = factory.makeLayer(),
      welcomeText;



    function activate() {
      welcomeText = new PIXI.Text("Physioshooter internal\nPress ENTER to start", {
        font: "bold italic 80px Arvo",
        fill: "#bb4433",
        align: "center",
        stroke: "#FFAAAA",
        strokeThickness: 5
      });

      welcomeText.position.x = config.get("width") / 2;
      welcomeText.position.y = config.get("height") / 2;
      welcomeText.anchor.x = 0.5;
      welcomeText.anchor.y = 0.5;

      layer.addChild(welcomeText);

      config.on("change", configChanged);
    }

    function deactivate() {
      layer.removeChild(welcomeText);

      config.off("change", configChanged);
    }

    function configChanged(model, options) {
      welcomeText.position.x = config.get("width") / 2;
      welcomeText.position.y = config.get("height") / 2;
    }

    function getLayer() {
      return layer;
    }

    return {
      activate: activate,
      deactivate: deactivate,
      getLayer: function() {
        return layer;
      }
    };

  }
);