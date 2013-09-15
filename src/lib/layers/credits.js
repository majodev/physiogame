define(["classes/Layer", "PIXI"],
  function(Layer, PIXI) {

    var layer = new Layer(),
      creditsText;

    layer.onActivate = function() {

      creditsText = new PIXI.Text("Mario Ranftl, BSc. (majodev)\n" +
        "practical part of the master thesis\n\n" +
        "FH JOANNEUM advanced information management \nDMT department" +
        "\n\nAssets by other artists:" +
        "\nBalloons Vector is from Stuart Bainbridge \n" +
        "Creative Commons Attribution-Share Alike 3.0 License.\n" +
        "http://stoostock.deviantart.com/art/Balloons-Vector-211127121 \n", {
          font: "bold 20px Arvo",
          fill: "#3344bb",
          align: "center",
          stroke: "#AAAAFF",
          strokeThickness: 1,
          wordWrap: false,
          wordWrapWidth: 100
        });

      creditsText.anchor = {
        x: 0.5,
        y: 0.5
      };

      creditsText.position = {
        x: layer.width / 2,
        y: layer.height / 2
      };


      this.addChild(creditsText);
    };

    return layer;

  }
);