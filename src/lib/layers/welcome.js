define(["PIXI", "classes/Layer"],
  function(PIXI, Layer) {

    var layer = new Layer(),
      welcomeText;

    layer.onActivate = function () {
      welcomeText = new PIXI.Text("Physioshooter internal", {
        font: "bold italic 80px Arvo",
        fill: "#bb4433",
        align: "center",
        stroke: "#FFAAAA",
        strokeThickness: 5
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