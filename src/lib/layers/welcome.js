define(["PIXI", "classes/Layer", "appConfig"],
  function(PIXI, Layer, appConfig) {

    var layer = new Layer(),
      welcomeText;

    layer.onActivate = function () {
      welcomeText = new PIXI.Text(appConfig.get("applicationName"), {
        font: "bold italic 80px Arvo",
        fill: "#3344bb",
        align: "center",
        stroke: "#AAAAFF",
        strokeThickness: 10
      });

      welcomeText.position.x = this.width / 2;
      welcomeText.position.y = this.height / 2;
      welcomeText.anchor.x = 0.5;
      welcomeText.anchor.y = 0.5;

      this.pixiLayer.addChild(welcomeText);
    };

    return layer;
  }
);