define(["PIXI", "display/textures", "underscore"],
  function(PIXI, textures, _) {

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

      //console.dir(this.settings);

      // examine options and merge into settings
      if (_.isUndefined(options) === false) {
        _.merge(this.settings, options);

        // texts are handled differently, e.g. should always be the same...
        if(_.isUndefined(this.settings.texts.mouseover)) {
          this.settings.texts.mouseover = this.settings.texts.normal;
        }
        if(_.isUndefined(this.settings.texts.click)) {
          this.settings.texts.click = this.settings.texts.mouseover;
        }
        if(_.isUndefined(this.settings.texts.tap)) {
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
      this.display.addChild(this.buttonBG);
      this.display.addChild(this.buttonText);

      // set the eventlisteners

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

        self.onClick();
      };

      this.buttonBG.tap = function(data) {
        this.setTexture(self.settings.textures[3]);
        self.buttonText.setText(self.settings.texts.tap);

        self.onTap();
      };

    };

    Button.prototype = {
      constructor: Button,
      onClick: function() {
        // OPTIONAL OVERRIDE
      },
      onMouseOut: function() {

      },
      onMouseOver: function() {

      },
      onTap: function() {

      },
      resetSettings: function(options) {
        if (_.isUndefined(options) === false) {
          _.merge(this.settings, options);
        }

        this.buttonText.setText(this.settings.text.normal);
        this.buttonBG.setTexture(this.settings.textures[0]);
      }
    };

    return Button;

  }
);