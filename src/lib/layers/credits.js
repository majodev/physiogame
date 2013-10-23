define(["classes/Layer", "PIXI", "game/textures",
    "text!layers/texts/creditTextGerman.txt"
  ],
  function(Layer, PIXI, textures, creditTextGerman) {

    var layer = new Layer({
      listeners: {
        render: true
      }
    }),
      balloon,
      creditsText,
      creditsTextContainer,
      fhlogo,
      majodevlogo,
      creditsHeader,
      ROTATE_MAX = 0.06,
      ROTATE_STEP = 0.0012,
      SCROLL_SPEED = 1,
      WORDWRAP = 900,
      scrollToZeroRuntime = 0,
      OFFSET_TO_ZERO = 70,
      OFFSET_BALLOON = 45,
      currentStep,
      creditsTextMask,
      creditsPlainObjectsCreated = false,
      creditsScroller;

    layer.onActivate = function() {

      currentStep = ROTATE_STEP;

      // container

      if (creditsPlainObjectsCreated === false) {
        createHeader();
        createLogos();
        createCreditsText();
        createBalloon();
        creditsPlainObjectsCreated = true;
      }

      createCreditsContainer();
      createCreditsScroller();

      // add scroller to container
      creditsTextContainer.addChild(creditsScroller);

      // add childs to scroller
      creditsScroller.addChild(balloon);
      creditsScroller.addChild(creditsHeader);
      creditsScroller.addChild(creditsText);
      creditsScroller.addChild(majodevlogo);
      creditsScroller.addChild(fhlogo);

      // container to layer
      this.addChild(creditsTextContainer);
    };


    function createCreditsContainer() {
      creditsTextMask = new PIXI.Graphics();
      creditsTextMask.beginFill(0xFF0000, 1);
      creditsTextMask.drawRect(0, 0, layer.width, layer.height);
      creditsTextMask.endFill();

      creditsTextContainer = new PIXI.DisplayObjectContainer();

      creditsTextContainer.position = {
        x: 0,
        y: 0
      };

      creditsTextContainer.mask = creditsTextMask;
    }

    function createCreditsScroller() {
      creditsScroller = new PIXI.DisplayObjectContainer();
      creditsTextContainer.position = {
        x: layer.width / 2,
        y: layer.height
      };
    }

    function createBalloon() {
      balloon = new PIXI.Sprite(textures.atlas.balloons[2]);

      // set its initial values...
      balloon.anchor.x = 0.5;
      balloon.anchor.y = 1;
      balloon.scale.x = 1; // will be set to minNormal after introduced!
      balloon.scale.y = 1; // will be set to minNormal after introduced!
      balloon.alpha = 1; // will be set to minNormal after introduced!

      // set positions and targets accordingliy...

      balloon.position.x = 0;
      balloon.position.y = -creditsHeader.height + OFFSET_BALLOON;
    }

    function createCreditsText() {

      creditsText = new PIXI.Text(creditTextGerman, {
        font: "bold 30px Arvo",
        fill: "#FFFFFF",
        align: "center",
        stroke: "#848484",
        strokeThickness: 2,
        wordWrap: true,
        wordWrapWidth: WORDWRAP
      });

      creditsText.anchor = {
        x: 0.5,
        y: 0
      };

      creditsText.position = {
        x: 0,
        y: 400
      };
    }

    function createHeader() {
      creditsHeader = new PIXI.Text("von\nMario Ranftl\n@majodev", {
        font: "bold 100px Arvo",
        fill: "#FFFFFF",
        align: "center",
        stroke: "#848484",
        strokeThickness: 2
      });

      creditsHeader.position.x = 6;
      creditsHeader.position.y = -390;
      creditsHeader.anchor.x = 0.5;
      creditsHeader.anchor.y = 0;
    }

    function createLogos() {
      majodevlogo = new PIXI.Sprite(textures.atlas.majodevicon);

      majodevlogo.anchor = {
        x: 0.5,
        y: 0.5
      };

      majodevlogo.scale = {
        x: 1,
        y: 1
      };

      majodevlogo.position = {
        x: 0,
        y: 110
      };

      fhlogo = new PIXI.Sprite(textures.atlas.fhjoanneumlogo);

      fhlogo.anchor = {
        x: 0.5,
        y: 0.5
      };

      fhlogo.scale = {
        x: 0.4,
        y: 0.4
      };

      fhlogo.position = {
        x: 0,
        y: 285
      };
    }

    layer.onRender = function() {
      creditsHeader.rotation += currentStep;
      if (Math.abs(creditsHeader.rotation) >= ROTATE_MAX) {
        currentStep = currentStep * -1;
      }

      scrollToZeroRuntime = creditsScroller.position.y + creditsText.height +
        creditsHeader.height + majodevlogo.height + fhlogo.height - OFFSET_TO_ZERO;

      majodevlogo.rotation += 0.08;

      if (scrollToZeroRuntime > 0) {
        creditsScroller.position.y -= SCROLL_SPEED;
        //console.log(scrollToZeroRuntime);
      } else {
        creditsScroller.alpha -= 0.005;
        if (creditsScroller.alpha <= 0) {
          creditsScroller.position.y = layer.height + creditsHeader.height/2;
          creditsScroller.alpha = 1;
        }
      }

    };

    layer.onDeactivate = function() {
      var i = 0;
      // masked credits cleanup...
      creditsTextMask.clear();
      creditsTextContainer.mask = undefined;
      for (i = creditsScroller.children.length - 1; i >= 0; i -= 1) {
        creditsScroller.removeChild(creditsScroller.children[i]);
      }
      for (i = creditsTextContainer.children.length - 1; i >= 0; i -= 1) {
        creditsTextContainer.removeChild(creditsTextContainer.children[i]);
      }
    };

    return layer;

  }
);