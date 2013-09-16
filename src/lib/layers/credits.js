define(["classes/Layer", "PIXI"],
  function(Layer, PIXI) {

    var layer = new Layer(),
      creditsText;

    layer.onActivate = function() {

      creditsText = new PIXI.Text("Mario Ranftl, BSc. (@majodev)\n" +
        "practical part of my master thesis for FH JOANNEUM, Graz, Austria (no kangaroos)\n" +
        "advanced information management master degree program\n" +
        "\nI would like to thank these artists for using their assets: \n" +
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