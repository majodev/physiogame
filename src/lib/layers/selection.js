define(["classes/Layer", "classes/Button"],
  function(Layer, Button, sceneManager) {

    var layer = new Layer(),
      shootingButton,
      creditsButton,
      balloonsButton;

    layer.onActivate = function() {

      shootingButton = new Button({
        texts: {
          normal: "shooting",
          mouseover: "play!",
        }
      });

      shootingButton.display.position = {
        x: this.width * 0.33,
        y: this.height * 0.75
      };

      shootingButton.onClick = function() {
        layer.notifyScene({
          pushScene: "shooting"
        });
      };

      balloonsButton = new Button({
        texts: {
          normal: "balloons",
          mouseover: "play!",
        }
      });

      balloonsButton.display.position = {
        x: this.width * 0.66,
        y: this.height * 0.75
      };

      balloonsButton.onClick = function() {
        layer.notifyScene({
          pushScene: "balloons"
        });
      };

      creditsButton = new Button({
        texts: {
          normal: "credits",
          mouseover: "credits!"
        }
      });

      creditsButton.display.scale = {
        x: 0.5,
        y: 0.5
      };

      creditsButton.display.position = {
        x: creditsButton.buttonBG.width/4 + 10,
        y: this.height - creditsButton.buttonBG.height/4 - 10
      };

      creditsButton.onClick = function() {
        layer.notifyScene({
          pushScene: "credits"
        });
      };

      this.addChild(shootingButton.display);
      this.addChild(balloonsButton.display);
      this.addChild(creditsButton.display);
    };

    return layer;

  });