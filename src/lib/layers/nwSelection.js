define(["PIXI", "classes/Layer", "utils/nwHelper", "classes/Button", "gameConfig", "i18n"],
  function(PIXI, Layer, nwHelper, Button, gameConfig, i18n) {

    var layer = new Layer(),
      fullscreenButton,
      quitButton;

    layer.onActivate = function() {

      var kioskMode = gameConfig.get("kioskMode");

      if (nwHelper.isAvailable() === true) {

        quitButton = new Button({
          texts: {
            normal: i18n.t("quit"),
            mouseover: i18n.t("quit") + "!",
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

        if(kioskMode === false) {
          this.addButton(fullscreenButton);
          this.addButton(quitButton);
        }
      }
    };

    function setFullscreenButton() {
      if (nwHelper.isFullscreen() === true) {
        fullscreenButton.resetSettings({
          texts: {
            normal: i18n.t("fullscreen"),
            mouseover: i18n.t("windowed") + "!",
            click: i18n.t("windowed") + "!",
            tap: i18n.t("windowed") + "!"
          }
        });
      } else {
        fullscreenButton.resetSettings({
          texts: {
            normal: i18n.t("windowed"),
            mouseover: i18n.t("fullscreen") + "!",
            click: i18n.t("fullscreen") + "!",
            tap: i18n.t("fullscreen") + "!"
          }
        });
      }
    }

    return layer;
  }
);