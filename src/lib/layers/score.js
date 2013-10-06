define(["log", "PIXI", "game/scoreEntity",
    "gameConfig", "Poll", "classes/Layer", "classes/Button"
  ],
  function(log, PIXI, scoreEntity, gameConfig, Poll, Layer, Button) {

    var layer = new Layer({
      listeners: {
        render: true
      }
    });

    var countingText,
      introText,
      winningText,
      timerText,
      textsCreated = false,
      winningAdded = false,
      scoreTimerCount = 0,
      scoreTimerRunning = false,
      introTimerCount = 0,
      introTimerRunning = true,
      introTimerLength,
      retryButton;

    layer.onActivate = function() {
      scoreEntity.resetScore();

      log.debug("score: activate");

      introTimerLength = gameConfig.get("introTimerLength") / 100;

      textsCreated = false;

      createTextButtons();

      countingText.visible = true;
      timerText.visible = true;
      introText.visible = true;
      winningText.visible = false;
      winningAdded = false;
      scoreTimerCount = 0;
      scoreTimerRunning = false;
      introTimerCount = 0;
      introTimerRunning = true;

      countingText.position.x = layer.width - 15;
      countingText.position.y = 0;
      countingText.anchor.x = 1;

      timerText.position.x = layer.width - 15;
      timerText.position.y = layer.height - 15;
      timerText.anchor.x = 1;
      timerText.anchor.y = 1;

      introText.position.x = layer.width / 2;
      introText.position.y = layer.height / 2;
      introText.scale.x = 0;
      introText.scale.y = 0;
      introText.anchor.x = 0.5;
      introText.anchor.y = 0.5;

      this.pixiLayer.addChild(countingText);
      this.pixiLayer.addChild(timerText);
      this.pixiLayer.addChild(introText);

      Poll.start({
        name: "introTimer",
        interval: 100,
        action: function() {
          introTimerCount += 1;
        }
      });

      Poll.start({
        name: "scoreTimer",
        interval: 100,
        action: function() {
          if (scoreTimerRunning) {
            scoreTimerCount += 1;
            timerText.setText("Zeit: " + scoreTimerCount / 10);
          }
        }
      });

      scoreEntity.on("change", scoreChanged);

    };

    layer.onRender = function() {
      animateIntroText();
    };

    function animateIntroText() {
      if (introTimerRunning && introTimerCount < introTimerLength) {
        if (introText.scale.x < 1) {
          introText.scale.x += 0.05;
          introText.scale.y += 0.05;
        }
      }
      if (introTimerRunning && introTimerCount > introTimerLength) {
        if (introText.scale.x > 0) {
          introText.scale.x -= 0.05;
          introText.scale.y -= 0.05;
        } else {
          introText.visible = false;
          introTimerRunning = false;
          Poll.stop("introTimer");
        }
      }
    }

    layer.onDeactivate = function() {
      Poll.stop("introTimer");
      Poll.stop("scoreTimer");

      scoreEntity.off("change", scoreChanged);
    };

    function createTextButtons() {
      if (textsCreated === false) {

        log.debug("createTextButtons");


        countingText = new PIXI.Text("0 von " + gameConfig.get("objectsToSpawn"), {
          font: "bold italic 20px Arvo",
          fill: "#bb4433",
          align: "right",
          stroke: "#FFAAAA",
          strokeThickness: 5
        });
        introText = new PIXI.Text("Mach den Bildschirm frei!", {
          font: "bold 80px Arvo",
          fill: "#3344bb",
          align: "center",
          stroke: "#AAAAFF",
          strokeThickness: 5
        });
        winningText = new PIXI.Text("Fertig!", {
          font: "bold 35px Arvo",
          fill: "#3344bb",
          align: "center",
          stroke: "#AAAAFF",
          strokeThickness: 5
        });
        timerText = new PIXI.Text("0.0", {
          font: "bold 30px Arvo",
          fill: "#bb4433",
          align: "right",
          stroke: "#FFAAAA",
          strokeThickness: 5
        });

        textsCreated = true;
      }
    }

    function scoreChanged(model, options) {
      var tempWinText,
        tempRankText;

      introTimerRunning = false;
      introText.visible = false;

      scoreTimerRunning = true;
      countingText.setText(model.get("aliensKilled") + " von " + gameConfig.get("objectsToSpawn"));

      //log.warn("scoreChange");

      if (winningAdded === false && gameConfig.get("objectsToSpawn") <= model.get("aliensKilled")) {
        // win, displayManager the text

        winningText.position.x = layer.width / 2;
        winningText.position.y = layer.height / 2;
        winningText.anchor.x = 0.5;
        winningText.anchor.y = 0.5;

        layer.pixiLayer.addChild(winningText);
        winningAdded = true;
        scoreTimerRunning = false;

        tempWinText = "Fertig!\nDu hast " +
          scoreEntity.get("aliensKilled") + " Objekte in " + scoreTimerCount / 10 + " Sekunden abgeschossen!\n" +
          "GRATULATION!\n\n\n\n";

        winningText.setText(tempWinText + "\nDanke fürs Spielen!");

        countingText.visible = false;
        timerText.visible = false;
        winningText.visible = true;


        // RETRY BUTTON HINZUFUEGEN...
        // 

        retryButton = new Button({
          style: {
            font: "bold 23px Arvo"
          },
          texts: {
            normal: "Neuer Versuch",
            mouseover: "Neuer Versuch!",
          }
        });

        retryButton.display.position = {
          x: layer.width / 2,
          y: layer.height * 0.87
        };

        retryButton.display.scale = {
          x: 1.2,
          y: 1.2
        };

        retryButton.onClick = function() {
          layer.notifyScene({
            resetCurrentScene: true
          });
        };

        layer.addChild(retryButton.display);

      }
    }

    return layer;
  }
);