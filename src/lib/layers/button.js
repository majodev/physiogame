define(["PIXI", "display/factory", "config", "classes/Layer"],
  function(PIXI, factory, config, Layer) {
    // var layer = factory.makeLayer(),
    //   buttonText;

    var layer = new Layer();

    layer.onActivate = function() {

      this.addChild(buttonText);
    };

    var buttonText = new PIXI.Text("Press me", {
      font: "bold italic 80px Arvo",
      fill: "#bb4433",
      align: "center",
      stroke: "#FFAAAA",
      strokeThickness: 5
    });

    buttonText.interactive = true;

    buttonText.position.x = config.get("width") * 0.75;
    buttonText.position.y = config.get("height") * 0.75;
    buttonText.anchor.x = 0.5;
    buttonText.anchor.y = 0.5;

    // set the mouseover callback..
    buttonText.mouseover = function(data) {

      this.isOver = true;

      if (this.isdown) {
        return;
      }

      this.setText("mouseover");
    };

    // set the mouseout callback..
    buttonText.mouseout = function(data) {

      this.isOver = false;
      if (this.isdown) {
        return;
      }

      this.setText("normal");
    };

    buttonText.click = function(data) {
      this.setText("click");
    };

    buttonText.tap = function(data) {
      this.setText("tap");
    };

    

    return layer;

  });