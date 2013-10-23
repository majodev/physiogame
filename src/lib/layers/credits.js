define(["classes/Layer", "PIXI", "game/textures",
    "text!layers/texts/creditTextGerman.txt"
  ],
  function(Layer, PIXI, textures, creditTextGerman) {

    var layer = new Layer({
      listeners: {
        render: true
      }
    }),
      creditsText,
      fhlogo,
      majodevlogo,
      creditsHeader,
      ROTATE_MAX = 0.04,
      ROTATE_STEP = 0.0003,
      currentStep;

    layer.onActivate = function() {


      currentStep = ROTATE_STEP;

      creditsHeader = new PIXI.Text("Physiogame\nby @majodev", {
        font: "bold italic 50px Arvo",
        fill: "#3344bb",
        align: "center",
        stroke: "#AAAAFF",
        strokeThickness: 5
      });

      creditsHeader.position.x = this.width / 2;
      creditsHeader.position.y = 30;
      creditsHeader.anchor.x = 0.5;
      creditsHeader.anchor.y = 0;

      this.pixiLayer.addChild(creditsHeader);

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

      creditsText = new PIXI.Text(creditTextGerman, {
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
        y: 1
      };

      creditsText.position = {
        x: layer.width / 2,
        y: layer.height - 30
      };


      this.addChild(creditsText);
    };

    layer.onRender = function() {
      creditsHeader.rotation += currentStep;
      if (Math.abs(creditsHeader.rotation) >= ROTATE_MAX) {
        currentStep = currentStep * -1;
      }
      //console.log(creditsHeader.rotation);
    };

    return layer;

  }
);