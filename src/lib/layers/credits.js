define(["classes/Layer", "PIXI", "display/textures"],
  function(Layer, PIXI, textures) {

    var layer = new Layer(),
      creditsText,
      fhlogo,
      majodevlogo;

    layer.onActivate = function() {

      fhlogo = new PIXI.Sprite(textures.atlas.fhjoanneumlogo);

      fhlogo.anchor = {
        x: 0.5,
        y: 0.5
      };

      fhlogo.scale = {
        x: 0.11,
        y: 0.11
      };

      fhlogo.position = {
        x: this.width/2,
        y: this.height/4 - 40
      };

      majodevlogo = new PIXI.Sprite(textures.atlas.majodevicon);

      majodevlogo.anchor = {
        x: 0.5,
        y: 0.5
      };

      majodevlogo.scale = {
        x: 0.24,
        y: 0.23
      };

      majodevlogo.position = {
        x: this.width/2,
        y: 30
      };


      this.addChild(majodevlogo);
      this.addChild(fhlogo);

      creditsText = new PIXI.Text("Mario Ranftl, BSc. (@majodev)\n" +
        "practical part of my master thesis for FH JOANNEUM, Graz, Austria (no kangaroos)\n" +
        "advanced information management master degree program\n\n" +
        "\nIn cooperation with FH JOANNEUM occupational therapy and physiotherapy\n\n" +
        "I would like to thank these artists for using their assets: \n" +
        "\nBalloons Vectors by Stuart Bainbridge\n" +
        "Creative Commons Attribution-Share Alike 3.0 License.\n\n" +
        "Aliens and explosion animation by PIXI.js team\n" +
        "MIT License\n\n" +
        "Webfont Arvo by Anton Koovit\nSIL Open Font License, 1.1\n\n" +
        "TOOLS: node-webkit, Flash, Texture Packer, Audacity, cfxr, Otomata, ImageOptim, ImageAlpha\n\n" +
        "FRAMEWORKS and LIBRARIES: requirejs, r.js, bootstrap, handlebars, howler, jquery, keymaster\n" +
        "leapjs, loglevel, pixi, polljs, spinjs, text, webfontloader, backbone, grunt, lodash, mocha, chai" + 
        "\n\nAll other assets are by Mario Ranftl, BSc. (@majodev)\nMIT License\n\n" +
        "A special THANK YOU goes to:\n@paulirish, @jrburke, @nischi, C.A.F. and NICI <3", {
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