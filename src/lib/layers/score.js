define(["log", "PIXI", "entities/scoreEntity",
    "objectsConfig", "Poll", "classes/Layer"
  ],
  function(log, PIXI, scoreEntity, objectsConfig, Poll, Layer) {

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
      introTimerRunning = true;

    layer.onActivate = function() {
      scoreEntity.resetScore();

      log.debug("score: activate");

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
      introText.anchor.x = 0.5;
      introText.anchor.y = 0.5;

      this.pixiLayer.addChild(countingText);
      this.pixiLayer.addChild(timerText);
      this.pixiLayer.addChild(introText);

      Poll.start({
        name: "textUpdater",
        interval: 100,
        action: function() {
          if (scoreTimerRunning) {
            scoreTimerCount += 1;
            timerText.setText("Zeit: " + scoreTimerCount / 10);
          }
          if (introTimerRunning) {
            introTimerCount += 1;
            if (introTimerCount > 60) {
              introTimerRunning = false;
            }
          }
        }
      });

      scoreEntity.on("change", scoreChanged);

    };

    layer.onRender = function() {
      onRenderDisableIntroAnimation();
    };

    layer.onDeactivate = function() {
      Poll.stop("textUpdater");

      scoreEntity.off("change", scoreChanged);
    };

    function createTextButtons() {
      if (textsCreated === false) {

        log.debug("createTextButtons");


        countingText = new PIXI.Text("0 von " + objectsConfig.get("objectsToSpawn"), {
          font: "bold italic 20px Arvo",
          fill: "#bb4433",
          align: "right",
          stroke: "#FFAAAA",
          strokeThickness: 5
        });
        introText = new PIXI.Text("Mach den Bildschirm von diesen " + objectsConfig.get("objectsToSpawn") +
          " Objekte frei!\n\n\nMaus: Taste gedrückt halten\n" +
          "Touchscreen: gedrückt halten\nLeap Motion: einfach zielen", {
            font: "bold 35px Arvo",
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

    function onRenderDisableIntroAnimation() {
      if (introText.alpha > 0) {
        if (introTimerRunning === false && introText.alpha > 0) {
          introText.alpha -= 0.02;
        }
      }
    }

    function scoreChanged(model, options) {
      var tempWinText,
        tempRankText;

      introTimerRunning = false;

      scoreTimerRunning = true;
      countingText.setText(model.get("aliensKilled") + " of " + objectsConfig.get("objectsToSpawn"));

      //log.warn("scoreChange");

      if (winningAdded === false && objectsConfig.get("objectsToSpawn") <= model.get("aliensKilled")) {
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
          "GRATULATION!\n\nRang: ";

        if (scoreTimerCount >= 2000) {
          tempRankText = "D, sufficiant!\n -- Yaa *eehhm* training for mastery...";
        }
        if (scoreTimerCount < 2000) {
          tempRankText = "C, good!\n -- You know your weapons young soldier...";
        }
        if (scoreTimerCount < 1300) {
          tempRankText = "B, nice!\n -- You have laser eyes and fast reflexes...";
        }
        if (scoreTimerCount < 600) {
          tempRankText = "A, aWeSoMe!\n -- I'm tha lase33r. ALL RIGHT!";
        }
        if (scoreTimerCount < 400) {
          tempRankText = "A+, WAT WAT WAT!\n -- Batman!";
        }

        winningText.setText(tempWinText + tempRankText + "\n\nDanke fürs Spielen!");

        countingText.visible = false;
        timerText.visible = false;
        winningText.visible = true;
      }
    }
    
    return layer;
  }
);