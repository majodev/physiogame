define(["classes/Layer", "classes/Button",
  "views/gameConfigModal", "views/statsModal",
  "base/soundBridge"],
  function(Layer, Button,
    gameConfigModal, statsModal,
    soundBridge) {

    var layer = new Layer(),
      shootingButton,
      creditsButton,
      settingsButton,
      //soundButton,
      statsButton;

    layer.onActivate = function() {

      shootingButton = new Button({
        texts: {
          normal: "Spielen",
          mouseover: "Spielen!",
        }
      });

      shootingButton.display.position = {
        x: this.width * 0.5,
        y: this.height * 0.7
      };

      shootingButton.onClick = function() {
        layer.notifyScene({
          pushScene: "shooting"
        });
      };

      shootingButton.display.scale = {
        x: 1.5,
        y: 1.5
      };

      settingsButton = new Button({
        style: {
          font: "bold 30px Arvo"
        },
        texts: {
          normal: "Einstellungen",
          mouseover: "Einstellungen!",
        }
      });

      settingsButton.display.position = {
        x: this.width * 0.58,
        y: this.height * 0.87
      };

      settingsButton.onClick = function() {
        gameConfigModal.show();
      };

      settingsButton.display.scale = {
        x: 0.7,
        y: 0.7
      };

      statsButton = new Button({
        style: {
          font: "bold 30px Arvo"
        },
        texts: {
          normal: "Statistiken",
          mouseover: "Statistiken!",
        }
      });

      statsButton.display.position = {
        x: this.width * 0.42,
        y: this.height * 0.87
      };

      statsButton.onClick = function() {
        statsModal.show();
      };

      statsButton.display.scale = {
        x: 0.7,
        y: 0.7
      };

      creditsButton = new Button({
        texts: {
          normal: "Credits",
          mouseover: "Credits!"
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

      // soundButton = new Button({
      //   style: {
      //     font: "bold 22px Arvo"
      //   }
      // });

      // setSoundButtons(); // set the texts according to the soundBridge settings

      // soundButton.display.scale = {
      //   x: 0.5,
      //   y: 0.5
      // };

      // soundButton.display.position = {
      //   x: this.width - soundButton.buttonBG.width / 4 - 10,
      //   y: soundButton.buttonBG.height / 4 + 10
      // };

      // soundButton.onClick = function() {
      //   soundBridge.toggleSound();
      //   setSoundButtons();
      // };



      this.addChild(settingsButton.display);
      this.addChild(shootingButton.display);
      this.addChild(creditsButton.display);
      //this.addChild(soundButton.display);
      this.addChild(statsButton.display);
    };

    // function setSoundButtons() {
    //   if (soundBridge.getSoundEnabled() === true) {
    //     soundButton.resetSettings({
    //       texts: {
    //         normal: "Sound aktiviert",
    //         mouseover: "Sound deaktivieren!",
    //         click: "Sound deaktivieren!",
    //         tap: "Sound deaktivieren!"
    //       }
    //     });
    //   } else {
    //     soundButton.resetSettings({
    //       texts: {
    //         normal: "Sound deaktiviert",
    //         mouseover: "Sound aktivieren!",
    //         click: "Sound aktivieren!",
    //         tap: "Sound aktivieren!"
    //       }
    //     });
    //   }
    // }

    return layer;

  });