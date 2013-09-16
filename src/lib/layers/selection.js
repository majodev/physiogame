define(["classes/Layer", "classes/Button", "views/settingsModal", "base/soundManager"],
  function(Layer, Button, settingsModal, soundManager) {

    var layer = new Layer(),
      shootingButton,
      creditsButton,
      settingsButton,
      soundButton;

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

      settingsButton.onClick = function() {
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
        x: creditsButton.buttonBG.width / 4 + 10,
        y: this.height - creditsButton.buttonBG.height / 4 - 10
      };

      creditsButton.onClick = function() {
        layer.notifyScene({
          pushScene: "credits"
        });
      };



      soundButton = new Button({
        style: {
          font: "bold 30px Arvo"
        },
        texts: {
          normal: "sound disabled",
          mouseover: "enable sound!",
          click: "enable sound!",
          tap: "enable sound!"
        }
      });

      soundButton.display.scale = {
        x: 0.5,
        y: 0.5
      };

      soundButton.display.position = {
        x: this.width - soundButton.buttonBG.width / 4 - 10,
        y: soundButton.buttonBG.height / 4 + 10
      };

      soundButton.onClick = function() {
        soundManager.toggleSound();
        if (soundManager.getSoundEnabled() === true) {
          soundButton.resetSettings({
            texts: {
              normal: "sound enabled",
              mouseover: "disable sound!",
              click: "disable sound!",
              tap: "disable sound!"
            }
          });
        } else {
          soundButton.resetSettings({
            texts: {
              normal: "sound disabled",
              mouseover: "enable sound!",
              click: "enable sound!",
              tap: "enable sound!"
            }
          });
        }
      };

      this.addChild(settingsButton.display);
      this.addChild(shootingButton.display);
      this.addChild(creditsButton.display);
      this.addChild(soundButton.display);
    };

    return layer;

  });