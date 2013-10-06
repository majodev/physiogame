define(["classes/Layer", "PIXI", "game/textures",
  "text!layers/texts/creditText.txt"],
  function(Layer, PIXI, textures, creditText) {

    var layer = new Layer(),
      creditsText,
      fhlogo,
      majodevlogo;

    layer.onActivate = function() {

      fhlogo = new PIXI.Sprite(textures.atlas.fhjoanneumlogo);

      fhlogo.anchor = {
        x: 1,
        y: 1
      };

      fhlogo.scale = {
        x: 0.11,
        y: 0.11
      };

      fhlogo.position = {
        x: this.width - 10,
        y: this.height - 10
      };

      majodevlogo = new PIXI.Sprite(textures.atlas.majodevicon);

      majodevlogo.anchor = {
        x: 1,
        y: 0
      };

      majodevlogo.scale = {
        x: 0.24,
        y: 0.23
      };

      majodevlogo.position = {
        x: this.width - 10,
        y: 0 + 10
      };


      this.addChild(majodevlogo);
      this.addChild(fhlogo);

      creditsText = new PIXI.Text(creditText, {
          font: "bold 18px Arvo",
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