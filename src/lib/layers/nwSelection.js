define(["PIXI", "classes/Layer", "appConfig", "utils/nwHelper", "classes/Button"],
  function(PIXI, Layer, appConfig, nwHelper, Button) {

    var layer = new Layer(),
      fullscreenButton,
      quitButton;

    layer.onActivate = function() {
      if (nwHelper.isAvailable() === true) {

        quitButton = new Button({
          texts: {
            normal: "Beenden",
            mouseover: "Beenden!",
          },
          style: {
            font: "bold 30px Arvo"
          }
        });

        quitButton.display.scale = {
          x: 0.5,
          y: 0.5
        };

        quitButton.display.position = {
          x: this.width - quitButton.buttonBG.width / 4 - 10,
          y: quitButton.buttonBG.height / 4 + 10
        };

        quitButton.onClick = function() {
          nwHelper.quitApp();
        };



        fullscreenButton = new Button({
          style: {
            font: "bold 30px Arvo"
          }
        });

        fullscreenButton.display.scale = {
          x: 0.5,
          y: 0.5
        };

        fullscreenButton.display.position = {
          x: this.width - quitButton.buttonBG.width / 2 - fullscreenButton.buttonBG.width / 4 - 20,
          y: fullscreenButton.buttonBG.height / 4 + 10
        };

        fullscreenButton.onClick = function() {
          nwHelper.toggleFullscreen();
          setFullscreenButton();
        };

        setFullscreenButton();

        this.addButton(fullscreenButton);
        this.addButton(quitButton);
        
      }
    };

    function setFullscreenButton() {
      if (nwHelper.isFullscreen() === true) {
        fullscreenButton.resetSettings({
          texts: {
            normal: "Vollbild",
            mouseover: "Fenster!",
            click: "Fenster!",
            tap: "Fenster!"
          }
        });
      } else {
        fullscreenButton.resetSettings({
          texts: {
            normal: "Fenster",
            mouseover: "Vollbild!",
            click: "Vollbild!",
            tap: "Vollbild!"
          }
        });
      }
    }

    return layer;
  }
);