define(["PIXI", "classes/Layer", "appConfig"],
  function(PIXI, Layer, appConfig) {

    var layer = new Layer({
      listeners: {
        render: true
      }
    });

    var welcomeText,
      ROTATE_MAX = 0.04,
      ROTATE_STEP = 0.0003,
      currentStep;

    layer.onActivate = function() {

      currentStep = ROTATE_STEP;

      welcomeText = new PIXI.Text(appConfig.get("applicationName"), {
        font: "bold italic 140px Arvo",
        fill: "#3344bb",
        align: "center",
        stroke: "#AAAAFF",
        strokeThickness: 10
      });

      welcomeText.position.x = this.width / 2;
      welcomeText.position.y = this.height * 0.4;
      welcomeText.anchor.x = 0.5;
      welcomeText.anchor.y = 0.5;

      this.pixiLayer.addChild(welcomeText);
    };

    layer.onRender = function() {
      welcomeText.rotation += currentStep;
      if(Math.abs(welcomeText.rotation) >= ROTATE_MAX) {
        currentStep = currentStep * -1;
      }
      //console.log(welcomeText.rotation);
    };

    return layer;
  }
);