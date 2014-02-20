define(["classes/Layer", "classes/Button",
    "base/soundBridge", "views/modalControls",
    "gameConfig", "PIXI", "i18n"
  ],
  function(Layer, Button,
    soundBridge, modalControls,
    gameConfig, PIXI, i18n) {

    var layer = new Layer(),
      shootingButton,
      creditsButton,
      settingsButton,
      statsButton,
      kioskOnlyText;

    layer.onActivate = function() {

      var noStatsOrSettings = gameConfig.get("kioskMode");

      shootingButton = new Button({
        texts: {
          normal: i18n.t("play"),
          mouseover: i18n.t("play") + "!",
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
          font: "bold 25px Arvo"
        },
        texts: {
          normal: i18n.t("settings"),
          mouseover: i18n.t("settings") + "!",
        }
      });

      settingsButton.display.position = {
        x: this.width * 0.58,
        y: this.height * 0.85
      };

      settingsButton.onClick = function() {
        modalControls.toggleConfig();
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
          normal: i18n.t("statistics"),
          mouseover: i18n.t("statistics") + "!",
        }
      });

      statsButton.display.position = {
        x: this.width * 0.42,
        y: this.height * 0.85
      };

      statsButton.onClick = function() {
        modalControls.toggleStats();
      };

      statsButton.display.scale = {
        x: 0.7,
        y: 0.7
      };

      creditsButton = new Button({
        texts: {
          normal: i18n.t("credits"),
          mouseover: i18n.t("credits") + "!"
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

      if (noStatsOrSettings === false) {
        this.addButton(settingsButton);
        this.addButton(statsButton);
      }

      this.addButton(shootingButton);
      this.addButton(creditsButton);


      if (noStatsOrSettings === true) {
        kioskOnlyText = new PIXI.Text(i18n.t("kioskModelSignal"), {
          font: "bold 25px Arvo",
          fill: "#3344bb",
          align: "left",
          stroke: "#AAAAFF",
          strokeThickness: 1,
          wordWrap: false,
          wordWrapWidth: 100
        });

        kioskOnlyText.anchor = {
          x: 0.5,
          y: 0.5
        };

        kioskOnlyText.position = {
          x: this.width * 0.5,
          y: this.height * 0.85
        };

        this.addChild(kioskOnlyText);
      }


    };

    return layer;

  });