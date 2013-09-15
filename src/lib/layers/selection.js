define(["classes/Layer", "classes/Button"],
  function(Layer, Button, sceneManager) {

    var layer = new Layer(),
      shootingButton,
      creditsButton;

    layer.onActivate = function() {

      shootingButton = new Button({
        texts: {
          normal: "shooting",
          mouseover: "play!",
        }
      });

      creditsButton = new Button({
        texts: {
          normal: "credits",
          mouseover: "credits!"
        }
      });

      shootingButton.display.position = {
        x: this.width * 0.5,
        y: this.height * 0.75
      };

      creditsButton.display.scale = {
        x: 0.5,
        y: 0.5
      };

      creditsButton.display.position = {
        x: creditsButton.buttonBG.width/4 + 10,
        y: this.height - creditsButton.buttonBG.height/4 - 10
      };

      shootingButton.onClick = function() {
        layer.notifyScene({
          pushScene: "shooting"
        });
      };

      creditsButton.onClick = function() {
        layer.notifyScene({
          pushScene: "credits"
        });
      };

      this.addChild(shootingButton.display);
      this.addChild(creditsButton.display);
    };

    return layer;

  });