define(["classes/Layer", "classes/Button", "views/settingsModal"],
  function(Layer, Button, settingsModal) {

    var layer = new Layer(),
      shootingButton,
      creditsButton,
      settingsButton;

    layer.onActivate = function() {

      shootingButton = new Button({
        texts: {
          normal: "play",
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

      settingsButton = new Button({
        texts: {
          normal: "settings",
          mouseover: "settings!",
        }
      });

      settingsButton.display.position = {
        x: this.width * 0.66,
        y: this.height * 0.75
      };

      settingsButton.onClick = function () {
        settingsModal.show();
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

      this.addChild(settingsButton.display);
      this.addChild(shootingButton.display);
      this.addChild(creditsButton.display);
    };

    return layer;

  });