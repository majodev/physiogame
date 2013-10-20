define(["classes/Layer", "PIXI", "game/textures", "base/leapManager",
    "gameConfig", "moment", "underscore"
  ],
  function(Layer, PIXI, textures, leapManager,
    gameConfig, moment, _) {

    var layer = new Layer({
      listeners: {
        render: true,
        leap: true
      }
    });

    var outLeft,
      outRight,
      outTop,
      outBottom,
      noHand,
      noHandText,
      minAlpha = 0.5,
      maxAlpha = 0.8,
      alphaModifier = 0.01,
      showThisLayer;

    layer.onActivate = function() {

      showThisLayer = gameConfig.get("leapShowIndicatorLayer");

      if (showThisLayer) {

        noHandText = new PIXI.Text("Bewege deine Hand in\nden Erkennungsbereich.", {
          font: "bold 20px Arvo",
          fill: "#FFFFFF",
          align: "left",
          stroke: "#3344bb",
          strokeThickness: 1,
          wordWrap: false,
          wordWrapWidth: 100
        });

        noHandText.position = {
          x: 100,
          y: 27
        };

        outLeft = new PIXI.Sprite(textures.atlas.leapOutside);
        outRight = new PIXI.Sprite(textures.atlas.leapOutside);
        outTop = new PIXI.Sprite(textures.atlas.leapOutside);
        outBottom = new PIXI.Sprite(textures.atlas.leapOutside);
        noHand = new PIXI.Sprite(textures.atlas.leapNoHand);

        outRight.rotation = Math.PI;
        outTop.rotation = Math.PI / 2;
        outBottom.rotation = -Math.PI / 2;

        outLeft.position = {
          x: 10,
          y: layer.height / 2
        };

        outRight.position = {
          x: layer.width - 10,
          y: layer.height / 2
        };

        outTop.position = {
          x: layer.width / 2,
          y: 10
        };

        outBottom.position = {
          x: layer.width / 2,
          y: layer.height - 10
        };

        noHand.position = {
          x: 15,
          y: 15
        };

        noHand.anchor = {
          x: 0,
          y: 0
        };

        noHand.scale = {
          x: 0.3,
          y: 0.3
        };

        applyOutsideOnlyParams(outLeft);
        applyOutsideOnlyParams(outRight);
        applyOutsideOnlyParams(outTop);
        applyOutsideOnlyParams(outBottom);

        applySharedParams(outLeft);
        applySharedParams(outRight);
        applySharedParams(outTop);
        applySharedParams(outBottom);

        applySharedParams(noHand);
        applySharedParams(noHandText);

        this.addChild(outLeft);
        this.addChild(outRight);
        this.addChild(outTop);
        this.addChild(outBottom);

        this.addChild(noHand);
        this.addChild(noHandText);
        noHandText.alpha = 0;
      }
    };

    function applyOutsideOnlyParams(pixiSprite) {
      pixiSprite.anchor = {
        x: 0,
        y: 0.5
      };

      pixiSprite.scale = {
        x: 0.25,
        y: 0.25
      };
    }

    function applySharedParams(pixiSprite) {
      pixiSprite.reverseAlphaModifier = false;
      pixiSprite.alpha = minAlpha;
      pixiSprite.visible = false;
    }

    layer.onRender = function() {

      if (leapManager.getLeapConnected() === false) {
        noHand.visible = false;
        outLeft.visible = false;
        outRight.visible = false;
        outTop.visible = false;
        outBottom.visible = false;
        noHandText.visible = false;
        return;
      }

      if (showThisLayer) {
        if (leapManager.getHandsAvailable() === false) {
          noHand.visible = true;
          noHandText.visible = true;
          outLeft.visible = false;
          outRight.visible = false;
          outTop.visible = false;
          outBottom.visible = false;
        } else {
          noHand.visible = false;
          noHandText.visible = false;
        }

        animateIndicator(noHand);
        animateNoHandText(noHandText);
        animateIndicator(outLeft);
        animateIndicator(outRight);
        animateIndicator(outTop);
        animateIndicator(outBottom);
      }
    };

    function animateNoHandText(noHandText) {
      var currentMoment = moment();
      if (noHandText.visible === true) {
        if (_.isUndefined(noHandText.startMoment) === true) {
          noHandText.startMoment = currentMoment;
        } else {
          // previous. lets wait 5 seconds, then fade it in...
          if (currentMoment.diff(noHandText.startMoment) >= 3000 &&
            currentMoment.diff(noHandText.startMoment) < 10000) {
            // fade it in
            if (noHandText.alpha < maxAlpha) {
              noHandText.alpha += alphaModifier;
              if (noHandText.alpha >= maxAlpha) {
                noHandText.alpha = maxAlpha;
              }
            }

          }
          if (currentMoment.diff(noHandText.startMoment) >= 10000 &&
            currentMoment.diff(noHandText.startMoment) < 13000) {
            // fade it out
            if (noHandText.alpha > 0) {
              noHandText.alpha -= alphaModifier;
              if (noHandText.alpha <= 0) {
                noHandText.alpha = 0;
              }
            }
          }
          if (currentMoment.diff(noHandText.startMoment) >= 13000) {
            // reset it
            noHandText.startMoment = undefined;
            noHandText.alpha = 0;
          }
        }
      } else {
        noHandText.startMoment = undefined;
        noHandText.alpha = 0;
      }
    }

    function animateIndicator(pixiSprite) {
      if (pixiSprite.visible === true) {
        if (pixiSprite.reverseAlphaModifier === false) {
          pixiSprite.alpha += alphaModifier;
        } else {
          pixiSprite.alpha -= alphaModifier;
        }

        if (pixiSprite.alpha > maxAlpha) {
          pixiSprite.reverseAlphaModifier = true;
        }

        if (pixiSprite.alpha < minAlpha) {
          pixiSprite.reverseAlphaModifier = false;
        }
      }
    }

    layer.onHandFrame = function(coordinates) {
      if (showThisLayer) {
        var outsideScreen = leapManager.getOutsideScreen();

        outLeft.visible = outsideScreen.left;
        outRight.visible = outsideScreen.right;
        outTop.visible = outsideScreen.top;
        outBottom.visible = outsideScreen.bottom;
      }
    };

    return layer;

  });