define(["log", "PIXI",
    "gameConfig", "classes/Layer", "classes/Button",
    "utils/timeFormatter", "game/stats",
    "game/timerRound", "game/timerIntro",
    "game/gameSession", "base/soundBridge"
  ],
  function(log, PIXI,
    gameConfig, Layer, Button,
    timeFormatter, stats,
    timerRound, timerIntro,
    gameSession, soundBridge) {

    var layer = new Layer({
      listeners: {
        render: true
      }
    });

    var countingText,
      introText,
      tippIntroText,
      winningStatsLabelsText,
      winningStatsValuesText,
      winningTopText,
      timerText,
      textsCreated = false,
      winningAdded = false,
      introComplete,
      gameModeTime = false,
      maxTime = 0,
      retryButton,
      INTRO_ROTATE_MAX = 0.02,
      INTRO_ROTATE_STEP = 0.0015,
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
      tippIntroText.visible = true;
      winningTopText.visible = false;
      winningStatsLabelsText.visible = false;
      winningStatsValuesText.visible = false;
      winningAdded = false;

      countingText.position.x = layer.width - 15;
      countingText.position.y = 15;
      countingText.anchor.x = 1;
      countingText.scale.x = countingText.scale.y = 1;

      timerText.position.x = layer.width - 15;
      timerText.position.y = layer.height - 15;
      timerText.anchor.x = 1;
      timerText.anchor.y = 1;
      timerText.scale.x = timerText.scale.y = 1;

      introText.position.x = layer.width / 2;
      introText.position.y = layer.height / 2;
      introText.scale.x = 0;
      introText.scale.y = 0;
      introText.anchor.x = 0.5;
      introText.anchor.y = 0.5;
      introText.currentStep = INTRO_ROTATE_STEP;

      tippIntroText.anchor.x = 0.5;
      tippIntroText.anchor.y = 1;
      tippIntroText.position.x = layer.width / 2;
      tippIntroText.position.y = layer.height - 90;
      tippIntroText.scale.x = 1;
      tippIntroText.scale.y = 1;
      tippIntroText.alpha = 0;


      this.pixiLayer.addChild(countingText);
      this.pixiLayer.addChild(timerText);
      this.pixiLayer.addChild(tippIntroText);
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
        if ((Math.round(tick / 1000) + 3) >= maxTime) {
          bumbText(timerText);
          soundBridge.play("timewarning");
        }
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
      animateIntroScale(introText);
      animateRotate(introText, introComplete, false);
      animateIntroAlpha(tippIntroText);
      animateScaleBumbReduzer(timerText);
      animateScaleBumbReduzer(countingText);
      animateRotate(winningTopText, winningAdded, true);
      animateXRun(winningStatsLabelsText, winningAdded, true);
      animateXRun(winningStatsValuesText, winningAdded, true);
    };

    function setStartupTexts() {

      var tippText;

      if (gameModeTime === true) {
        countingText.setText(currentStats.get("objectsCatched"));
        introText.setText("Erwische soviele wie möglich\nin " + timeFormatter.formatSeconds(maxTime) + "!");
        timerText.setText("0:00 von " + timeFormatter.formatSeconds(maxTime));
      } else {
        countingText.setText(currentStats.get("objectsCatched") + " von " + gameConfig.get("objectsToSpawn"));
        introText.setText("Erwische alle " + gameConfig.get("objectsToSpawn") + " Objekte!");
        timerText.setText("0:00");
      }

      switch (gameConfig.get("gameObjectCondition")) {
        case "objectScale":
          tippText = ("Interaktion: Sie platzen wenn Du sie fokusierst!");
          break;
        case "clickOrDepth":
          tippText = ("Interaktion: Sie platzen wenn Du sie stoßt/anklickst!");
          break;
        default:
          tippText = ("ERROR: KEIN OBJEKTSPIELZIEL!");
          log.error("gameObjects: gameObjectCondition not supported!");
          break;
      }

      tippText += "\nTipp: " + getRandomTipText();

      tippIntroText.setText(tippText);
    }

    function getRandomTipText() {
      return "Versuche Sie mittig zu treffen.";
    }

    function animateIntroScale(whichText) {
      if (whichText.visible === true) {
        if (introComplete === false) {
          if (whichText.scale.x < 1) {
            whichText.scale.x += 0.05;
            whichText.scale.y += 0.05;
            if (whichText.scale.x > 1) {
              whichText.scale.x = 1;
              whichText.scale.y = 1;
            }
          }
        }

        if (introComplete === true) {
          if (whichText.scale.x > 0) {
            whichText.scale.x -= 0.02;
            whichText.scale.y -= 0.02;
          } else {
            whichText.visible = false;
          }
        }
      }
    }

    function animateRotate(whichText, flag, boolWhenRunning) {
      if (whichText.visible === true) {
        if (flag === boolWhenRunning) {
          whichText.rotation += whichText.currentStep;
          if (Math.abs(whichText.rotation) >= INTRO_ROTATE_MAX) {
            whichText.currentStep = whichText.currentStep * -1;
          }
        } else {
          whichText.rotation = 0;
        }
      }
    }

    function animateXRun(whichText, flag, boolWhenRunning) {
      if (whichText.visible === true) {
        if (flag === boolWhenRunning) {
          if (whichText.position.x !== whichText.currentXTarget) {
            whichText.position.x += whichText.currentXStep;
            if (whichText.currentXStep < 0) {
              if (whichText.position.x < whichText.currentXTarget) {
                whichText.position.x = whichText.currentXTarget;
              }
            } else {
              if (whichText.position.x > whichText.currentXTarget) {
                whichText.position.x = whichText.currentXTarget;
              }
            }
          }
        }
      }
    }

    function animateIntroAlpha(whichText) {
      if (whichText.visible === true) {
        if (introComplete === false) {
          if (whichText.alpha < 0.8) {
            whichText.alpha += 0.025;
            if (whichText.alpha > 0.8) {
              whichText.alpha = 0.8;
            }
          }
        }

        if (introComplete === true) {
          if (whichText.alpha > 0) {
            whichText.alpha -= 0.0075;
          } else {
            whichText.visible = false;
          }
        }
      }
    }

    function animateScaleBumbReduzer(whichText) {
      if (whichText.scale.x > 1) {
        whichText.scale.x -= 0.02;
        whichText.scale.y -= 0.02;
        if (whichText.scale.x < 1) {
          whichText.scale.x = whichText.scale.y = 1;
        }
      }
    }

    function bumbText(whichText) {
      whichText.scale.x = whichText.scale.y = 1.8;
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
          font: "bold 60px Arvo",
          fill: "#3344bb",
          align: "center",
          stroke: "#AAAAFF",
          strokeThickness: 5
        });
        tippIntroText = new PIXI.Text("NOTHING", {
          font: "bold 30px Arvo",
          fill: "#FFFFFF",
          align: "center",
          stroke: "#848484",
          strokeThickness: 2
        });
        winningStatsLabelsText = new PIXI.Text("NOTHING", {
          font: "bold 40px Arvo",
          fill: "#FFFFFF",
          align: "right",
          stroke: "#848484",
          strokeThickness: 3
        });
        winningStatsValuesText = new PIXI.Text("NOTHING", {
          font: "bold 40px Arvo",
          fill: "#3344bb",
          align: "left",
          stroke: "#AAAAFF",
          strokeThickness: 3
        });
        winningTopText = new PIXI.Text("NOTHING", {
          font: "bold 55px Arvo",
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

      if (gameModeTime === true) {
        countingText.setText(model.get("objectsCatched"));
      } else {
        countingText.setText(model.get("objectsCatched") + " von " + gameConfig.get("objectsToSpawn"));
      }

      bumbText(countingText);

    }

    function showWinningText() {

      var tempWinText;

      var totalMovement;
      var withinMovement;
      var percentage;

      if (winningAdded === false) {

        // top text

        winningTopText.position.x = layer.width / 2;
        winningTopText.position.y = 110;
        winningTopText.anchor.x = 0.5;
        winningTopText.anchor.y = 0;
        winningTopText.currentStep = INTRO_ROTATE_STEP;

        winningTopText.setText(gameConfig.getFormattedValue("userName") + ", du hast es geschafft!\n\n");
        layer.pixiLayer.addChild(winningTopText);
        winningTopText.visible = true;

        // stats labels

        winningStatsLabelsText.position.x = 0;
        winningStatsLabelsText.position.y = 235;
        winningStatsLabelsText.anchor.x = 1;
        winningStatsLabelsText.anchor.y = 0;
        winningStatsLabelsText.currentXStep = 20;
        winningStatsLabelsText.currentXTarget = (layer.width / 2) - 15;

        winningStatsLabelsText.setText(
          "Treffer:\n" +
          "Zeit:\n" +
          "Genauigkeit:\n" +
          "gesamter Bewegungsweg:\n" +
          "Spielfeld Bewegungsweg:\n");
        layer.pixiLayer.addChild(winningStatsLabelsText);
        winningStatsLabelsText.visible = true;

        // stats values
        winningStatsValuesText.position.x = layer.width;
        winningStatsValuesText.position.y = 235;
        winningStatsValuesText.anchor.x = 0;
        winningStatsValuesText.anchor.y = 0;
        winningStatsValuesText.currentXStep = -20;
        winningStatsValuesText.currentXTarget = (layer.width / 2) + 15;

        totalMovement = Math.floor(currentStats.get("leapMovementAllHyp"));
        withinMovement = Math.floor(currentStats.get("leapMovementInsideHyp"));
        percentage = (totalMovement === 0) ? "0 %" : Math.floor((100 / totalMovement * withinMovement)) + " %";
        totalMovement = (totalMovement === 0) ? "nur mit Leap Motion" : totalMovement + " mm";
        withinMovement = (withinMovement === 0) ? "nur mit Leap Motion" : withinMovement + " mm";

        winningStatsValuesText.setText(
          currentStats.get("objectsCatched") + " Objekte\n" +
          timeFormatter.formatSeconds(currentStats.get("playTime") / 1000) + "\n" +
          Math.ceil(currentStats.get("accuracySum") * 100) + " %\n" +
          totalMovement + "\n" +
          withinMovement + " (" + percentage + ")");
        layer.pixiLayer.addChild(winningStatsValuesText);
        winningStatsValuesText.visible = true;


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
          y: layer.height * 0.82
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

        // count and time to invisible

        countingText.visible = false;
        timerText.visible = false;

        // set flag to make animations running...
        winningAdded = true;
      }
    }

    return layer;
  }
);