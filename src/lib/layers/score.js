define(["PIXI", "models/score", "display/factory", "config", "controllers/display"],
  function(PIXI, score, factory, config, display) {

    var layer = factory.makeLayer(),
      countingText,
      introText,
      winningText,
      timerText,
      textsCreated = false,
      winningAdded = false,
      scoreTimerCount = 0,
      scoreTimerRunning = false,
      introTimerCount = 0,
      introTimerRunning = true;

    config.on("change", configChanged);
    score.on("change", scoreChanged);


    function createTextButtons() {
      if (textsCreated === false) {

        console.log("createTextButtons");


        countingText = new PIXI.Text("0 of " + config.get("aliensToSpawn"), {
          font: "bold italic 20px Arvo",
          fill: "#bb4433",
          align: "right",
          stroke: "#FFAAAA",
          strokeThickness: 5
        });
        introText = new PIXI.Text("STOP those " + config.get("aliensToSpawn") +
          " bastards!\n\n\nmouse: point, hold and kill\n" +
          "touchscreen: touch, point and kill\nleapmotion: point and kill", {
            font: "bold 35px Arvo",
            fill: "#3344bb",
            align: "center",
            stroke: "#AAAAFF",
            strokeThickness: 5
          });
        winningText = new PIXI.Text("WIN!", {
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

    function activate() {

      console.log("score: activate");

      createTextButtons();

      countingText.position.x = config.get("width") - 15;
      countingText.position.y = 0;
      countingText.anchor.x = 1;

      timerText.position.x = config.get("width") - 15;
      timerText.position.y = config.get("height") - 15;
      timerText.anchor.x = 1;
      timerText.anchor.y = 1;

      introText.position.x = config.get("width") / 2;
      introText.position.y = config.get("height") / 2;
      introText.anchor.x = 0.5;
      introText.anchor.y = 0.5;

      layer.addChild(countingText);
      layer.addChild(timerText);
      layer.addChild(introText);

      display.events.on("renderFrame", onRenderDisableIntroAnimation);
    }

    function onRenderDisableIntroAnimation() {
      if (introText.alpha > 0) {
        if (introTimerRunning === false && introText.alpha > 0) {
          introText.alpha -= 0.02;
        }
      }
    }

    function configChanged(model, options) {
      countingText.position.x = model.get("width") - 15;

      timerText.position.x = model.get("width") - 15;
      timerText.position.y = model.get("height") - 15;

      if (winningAdded === true) {
        winningText.position.x = model.get("width") / 2;
        winningText.position.y = model.get("height") / 2;
      }
    }

    function scoreChanged(model, options) {
      var tempWinText,
        tempRankText;

      introTimerRunning = false;

      scoreTimerRunning = true;
      countingText.setText(model.get("aliensKilled") + " of " + config.get("aliensToSpawn"));

      if (winningAdded === false && config.get("aliensToSpawn") <= model.get("aliensKilled")) {
        // win, display the text

        winningText.position.x = config.get("width") / 2;
        winningText.position.y = config.get("height") / 2;
        winningText.anchor.x = 0.5;
        winningText.anchor.y = 0.5;

        layer.addChild(winningText);
        winningAdded = true;
        scoreTimerRunning = false;

        tempWinText = "WIN!\nYou have killed " +
          score.get("aliensKilled") + " aliens in " + scoreTimerCount / 10 + " seconds!\n" +
          "CONTRATULATIONS!\n\nRANK: ";

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

        winningText.setText(tempWinText + tempRankText);

        countingText.visible = false;
        timerText.visible = false;
      }
    }

    setInterval(function() {
      if (scoreTimerRunning) {
        scoreTimerCount += 1;
        //scoreTimerCount = parseInt(scoreTimerCount*10 , 10)/10;

        timerText.setText("Time: " + scoreTimerCount / 10);
      }
      if (introTimerRunning) {
        introTimerCount += 1;
        if (introTimerCount > 60) {
          introTimerRunning = false;
        }
      }

    }, 100);

    function deactivate() {
      display.events.off("renderFrame", onRenderDisableIntroAnimation);
    }



    return {
      getLayer: function() {
        return layer;
      },
      activate: activate,
      deactivate: deactivate
    };
  }
);