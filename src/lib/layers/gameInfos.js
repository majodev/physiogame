define(["log", "PIXI",
    "gameConfig", "classes/Layer", "classes/Button",
    "utils/timeFormatter", "game/stats",
    "game/timerRound", "game/timerIntro",
    "game/gameSession"
  ],
  function(log, PIXI,
    gameConfig, Layer, Button,
    timeFormatter, stats,
    timerRound, timerIntro,
    gameSession) {

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
      introComplete,
      gameModeTime = false,
      maxTime = 0,
      retryButton,
      currentStats;

    layer.onActivate = function() {

      introComplete = false;
      currentStats = stats.getCurrent();

      if (gameConfig.get("gameMode") === "clearInTime") {
        gameModeTime = true;
        maxTime = gameConfig.get("gameMaxTime");
      } else {
        gameModeTime = false;
      }

      textsCreated = false;

      createTextButtons();

      countingText.visible = true;
      timerText.visible = true;
      introText.visible = true;
      winningText.visible = false;
      winningAdded = false;

      countingText.position.x = layer.width - 15;
      countingText.position.y = 15;
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

      timerRound.events.on("roundTickSecond", onTimerRoundTickSecond);
      timerIntro.events.on("introEnd", onTimerIntroEnd);
      gameSession.events.on("endSession", showWinningText);

      setStartupTexts();

      currentStats.on("change", scoreChanged);

    };

    function onTimerRoundTickSecond(tick) {
      if (gameModeTime === true) {
        timerText.setText(timeFormatter.formatSeconds(tick / 1000) + " von " + timeFormatter.formatSeconds(maxTime));
      } else {
        timerText.setText(timeFormatter.formatSeconds(tick / 1000));
      }
    }

    function onTimerIntroEnd(tick) {
      //log.debug("introend!");
      introText.setText("Los!");
      introComplete = true;
    }

    layer.onRender = function() {
      animateIntroText();
    };

    function setStartupTexts() {
      if (gameModeTime === true) {
        countingText.setText(currentStats.get("objectsCatched"));
        introText.setText("Erwische soviele wie möglich!\nZeit: " + timeFormatter.formatSeconds(maxTime));
        timerText.setText("0:00 von " + timeFormatter.formatSeconds(maxTime));
      } else {
        countingText.setText(currentStats.get("objectsCatched") + " von " + gameConfig.get("objectsToSpawn"));
        introText.setText("Erwische alle Objekte!");
        timerText.setText("0:00");
      }
    }

    function animateIntroText() {
      if (introText.visible === true) {
        if (introComplete === false) {
          if (introText.scale.x < 1) {
            introText.scale.x += 0.05;
            introText.scale.y += 0.05;
            if(introText.scale.x > 1) {
              introText.scale.x = 1;
              introText.scale.y = 1;
            }
          }
        }

        if (introComplete === true) {
          if (introText.scale.x > 0) {
            //log.debug(introText.scale.x);
            introText.scale.x -= 0.02;
            introText.scale.y -= 0.02;
          } else {
            introText.visible = false;
          }
        }

      }
    }

    layer.onDeactivate = function() {

      timerRound.events.off("roundTickSecond", onTimerRoundTickSecond);
      timerIntro.events.off("introEnd", onTimerIntroEnd);
      gameSession.events.off("endSession", showWinningText);

      currentStats.off("change", scoreChanged);
    };

    function createTextButtons() {
      if (textsCreated === false) {

        countingText = new PIXI.Text("NOTHING", {
          font: "bold 20px Arvo",
          fill: "#bb4433",
          align: "right",
          stroke: "#FFAAAA",
          strokeThickness: 5
        });
        introText = new PIXI.Text("NOTHING", {
          font: "bold 80px Arvo",
          fill: "#3344bb",
          align: "center",
          stroke: "#AAAAFF",
          strokeThickness: 5
        });
        winningText = new PIXI.Text("NOTHING", {
          font: "bold 35px Arvo",
          fill: "#3344bb",
          align: "center",
          stroke: "#AAAAFF",
          strokeThickness: 5
        });
        timerText = new PIXI.Text("NOTHING", {
          font: "bold 20px Arvo",
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

      if (gameModeTime === true) {
        countingText.setText(model.get("objectsCatched"));
      } else {
        countingText.setText(model.get("objectsCatched") + " von " + gameConfig.get("objectsToSpawn"));
      }

    }

    function showWinningText() {

      var totalMovement;
      var withinMovement;
      var percentage;

      if (winningAdded === false) {

        // win, display the text

        winningText.position.x = layer.width / 2;
        winningText.position.y = layer.height / 2;
        winningText.anchor.x = 0.5;
        winningText.anchor.y = 0.5;

        layer.pixiLayer.addChild(winningText);
        winningAdded = true;

        tempWinText = gameConfig.getFormattedValue("userName") + ", du hast " +
          currentStats.get("objectsCatched") + " Objekte in " +
          timeFormatter.formatSeconds(currentStats.get("playTime") / 1000) +
          " erwischt!\n\n";

        totalMovement = Math.floor(currentStats.get("leapMovementAllHyp"));

        if (totalMovement > 0) {
          withinMovement = Math.floor(currentStats.get("leapMovementInsideHyp"));
          percentage = (withinMovement === 0) ? 0 : Math.floor((100 / totalMovement * withinMovement));

          tempWinText += "Leap Motion sagt:\nDu hast dich in dieser Runde " +
            totalMovement + " mm bewegt und\n" +
            "warst zu " + percentage + " % innerhalb des Spielfeldes.\n";

        } else {
          tempWinText += "Leider hast du nicht mit Leap Motion gespielt\nsonst könnte ich dir noch mehr verraten...\n";
        }

        winningText.setText(tempWinText + "\nDanke fürs Spielen!\n");

        countingText.visible = false;
        timerText.visible = false;
        winningText.visible = true;


        // RETRY BUTTON HINZUFUEGEN...

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

        layer.addButton(retryButton);
      }
    }

    return layer;
  }
);