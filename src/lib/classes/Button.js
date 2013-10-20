define(["PIXI", "game/textures", "underscore", "base/soundBridge",
    "base/leapManager", "utils/hittest", "moment"
  ],
  function(PIXI, textures, _, soundBridge,
    leapManager, hittest, moment) {

    var LEAP_INDICATOR_OFFSET_X = 20,
      LEAP_INDICATOR_PRODUCT_Y = 0,
      LEAP_BUTTON_CLICK_AFTER_MS = 1500,
      LEAP_INDICATOR_COLOR = 0x44FF44,
      LEAP_INDICATOR_ALPHA = 0.6,
      LEAP_INDICATOR_LINEWIDTH = 55;

    var Button = function(options) {

      var self = this; // save a reference to reference back in eventlisteners
      var defaultBGTextures = textures.atlas.buttonBGs;

      this.settings = {
        style: {
          font: "bold 40px Arvo",
          fill: "#bb4433",
          align: "center",
          stroke: "#FFAAAA",
          strokeThickness: 5,
          wordWrap: false,
          wordWrapWidth: 100
        },
        texts: {
          normal: "normal",
          mouseover: undefined,
          click: undefined,
          tap: undefined
        },
        textures: defaultBGTextures
      };

      // examine options and merge into settings
      if (_.isUndefined(options) === false) {
        _.merge(this.settings, options);

        // texts are handled differently, e.g. should always be the same...
        if (_.isUndefined(this.settings.texts.mouseover)) {
          this.settings.texts.mouseover = this.settings.texts.normal;
        }
        if (_.isUndefined(this.settings.texts.click)) {
          this.settings.texts.click = this.settings.texts.mouseover;
        }
        if (_.isUndefined(this.settings.texts.tap)) {
          this.settings.texts.tap = this.settings.texts.click;
        }
      }

      // set PIXI Button Layers
      this.buttonBG = new PIXI.Sprite(this.settings.textures[0]);

      this.buttonBG.anchor = {
        x: 0.5,
        y: 0.5
      };

      this.buttonText = new PIXI.Text(this.settings.texts.normal, this.settings.style);

      this.buttonText.anchor = {
        x: 0.5,
        y: 0.5
      };

      // set the button layers interactive
      this.buttonText.interactive = true;
      this.buttonBG.interactive = true;
      this.buttonText.buttonMode = true;
      this.buttonBG.buttonMode = true;

      // attach button text and bg to container
      this.display = new PIXI.DisplayObjectContainer();

      // set the eventlisteners for the buttonbg (mouse/touch handlers)

      this.buttonBG.mouseout = function(data) {

        this.isOver = false;
        if (this.isdown) {
          return;
        }

        this.setTexture(self.settings.textures[0]);
        self.buttonText.setText(self.settings.texts.normal);

        self.onMouseOut();
      };

      this.buttonBG.mouseover = function(data) {

        this.isOver = true;

        if (this.isdown) {
          return;
        }

        this.setTexture(self.settings.textures[1]);
        self.buttonText.setText(self.settings.texts.mouseover);

        self.onMouseOver();
      };

      this.buttonBG.click = function(data) {
        this.setTexture(self.settings.textures[2]);
        self.buttonText.setText(self.settings.texts.click);

        soundBridge.play("select");

        self.onClick();
      };

      this.buttonBG.tap = function(data) {
        this.setTexture(self.settings.textures[3]);
        self.buttonText.setText(self.settings.texts.tap);

        soundBridge.play("select");

        self.onTap();
      };


      // set the graphics obj for the leap button indicators
      this.leapIndicator = new PIXI.Graphics();
      this.display.addChild(this.buttonBG);
      this.display.addChild(this.leapIndicator);
      this.display.addChild(this.buttonText);
      
    };

    Button.prototype = {
      constructor: Button,
      onClick: function() {
        // OPTIONAL OVERRIDES
      },
      onMouseOut: function() {
        // OPTIONAL OVERRIDES
      },
      onMouseOver: function() {
        // OPTIONAL OVERRIDES
      },
      onTap: function() {
        // OPTIONAL OVERRIDES
      },
      resetSettings: function(options) {
        if (_.isUndefined(options) === false) {
          _.merge(this.settings, options);
        }

        this.buttonText.setText(this.settings.texts.normal);
        this.buttonBG.setTexture(this.settings.textures[0]);
      },
      unregisterLeap: function() {
        //console.log("Button unregisterLeap");
        leapManager.events.off("handFrameNormalized", this.leapInteractionHandler, this);
      },
      registerLeap: function() {
        //console.log("Button registerLeap");
        // leap needs special treatment, lifecycle of listeners gets handled by Layer Class auto!
        leapManager.events.on("handFrameNormalized", this.leapInteractionHandler, this);
      },
      leapDrawIndicator: function(time) {

        var percentage = time / LEAP_BUTTON_CLICK_AFTER_MS;

        var lineY = (-(this.buttonBG.width / 2) + LEAP_INDICATOR_OFFSET_X) +
          ((this.buttonBG.width - LEAP_INDICATOR_OFFSET_X*2) * percentage);

        this.leapIndicator.clear();
        if (percentage > 0 && time <= LEAP_BUTTON_CLICK_AFTER_MS) {
          this.leapIndicator.lineStyle(LEAP_INDICATOR_LINEWIDTH, LEAP_INDICATOR_COLOR, LEAP_INDICATOR_ALPHA);
          this.leapIndicator.moveTo(-(this.buttonBG.width / 2) + LEAP_INDICATOR_OFFSET_X, (this.buttonBG.height / 2) * LEAP_INDICATOR_PRODUCT_Y);
          this.leapIndicator.lineTo(lineY, (this.buttonBG.height / 2) * LEAP_INDICATOR_PRODUCT_Y);
        }

      },
      leapInteractionHandler: function(coordinates) {
        var hitCord = _.extend(coordinates, {
          width: 20,
          height: 20,
          anchor: {
            x: 0.5,
            y: 0.5
          }
        });

        var buttonCord = {
          position: this.display.position,
          width: this.buttonBG.width * this.display.scale.x,
          height: this.buttonBG.height * this.display.scale.y,
          anchor: {
            x: 0.5,
            y: 0.5
          }
        };

        var hittedByLeap = hittest(hitCord, buttonCord),
          currentMoment = moment(),
          diff = 0;

        if (hittedByLeap === true) {
          if (_.isUndefined(this.leapInitialHitMoment) === true) {
            this.leapInitialHitMoment = currentMoment;
          } else {
            diff = currentMoment.diff(this.leapInitialHitMoment);
            // check if time reached for click to be called...
            if (diff >= LEAP_BUTTON_CLICK_AFTER_MS) {
              //console.log("leap button click!");
              this.leapInitialHitMoment = undefined; // reset moment.
              this.buttonBG.click();
            } else {
              this.buttonBG.mouseover();
            }
          }
        } else {
          this.buttonBG.mouseout();
          this.leapInitialHitMoment = undefined;
        }

        this.leapDrawIndicator(diff);
      }
    };

    return Button;

  });