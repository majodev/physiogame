define(["underscore", "PIXI", "utils/publisher", "base/leapManager",
  "moment", "gameConfig"],
  function(_, PIXI, publisher, leapManager,
    moment, gameConfig) {

    // Shared Interaction Hooks: Lock Mouse-Input if Leap is active for Milliseconds
    var lastLeapInputMoment,
      lockMouseInputForMs = gameConfig.get("leapLocksMouseAndTouchForMs");

    gameConfig.on("change", function(model, options) {
      lockMouseInputForMs = model.get("leapLocksMouseAndTouchForMs");
    });

    function registerLeapInput() {
      lastLeapInputMoment = moment();
    }

    function checkMouseInputAllowed() {
      if (_.isUndefined(lastLeapInputMoment) === false) {
        if (moment().diff(lastLeapInputMoment) <= lockMouseInputForMs) {
          return false; // mouse input NOT allowed
        } else {
          lastLeapInputMoment = undefined; // reset so check doesn't have to occur
        }
      }
      return true; // mouse input allowed
    }

    var Scene = function(options) {

      var self = this;

      this.running = false;
      this.pixiScene = new PIXI.DisplayObjectContainer();
      this.events = publisher.make();

      if (_.isUndefined(options) || _.isUndefined(options.layers) || _.isUndefined(options.id)) {
        throw new Error("A Scene needs to have an id and layers!");
      }

      this.layers = options.layers;
      this.id = options.id;

      if (_.isUndefined(options.backgroundMusic) === false) {
        this.backgroundMusic = options.backgroundMusic;
      }

      this.lastInteraction = {
        position: {
          x: 634,
          y: 300
        }
      };

      this.pixiScene.interactive = true;

      // mouse and touch listeners...
      this.pixiScene.mousedown = this.pixiScene.tap = function(interactionData) {
        if (checkMouseInputAllowed() === true) { // shared interaction hook
          self.onClick({
            leapCoordinates: false,
            position: interactionData.global,
            depth: -leapManager.LEAP_Z_NORMALIZED_MAX_STEP // depth MAX normalized leap mouse/touch emu
          });
        }
      };

      this.pixiScene.mouseup = this.pixiScene.touchend = this.pixiScene.mousemove = this.pixiScene.touchmove = function(interactionData) {
        if (checkMouseInputAllowed() === true) { // shared interaction hook
          self.onMove({
            leapCoordinates: false,
            position: interactionData.global,
            depth: leapManager.LEAP_Z_NORMALIZED_MAX_STEP // depth CENTER normalized leap mouse/touch emu
          });
        }
      };

      // leap listeners...
      leapManager.events.on("handFrameNormalized", function(coordinates) {
        registerLeapInput(); // shared interaction hook
        self.onHandFrame(coordinates);
      });

    };

    Scene.prototype = {
      constructor: Scene,
      activate: function(lastInteraction) {
        var i = 0,
          len = this.layers.length;

        if (this.running === false) {
          for (i; i < len; i += 1) {
            this.layers[i].events.on("sceneNotification", this.onLayerEvent, this);
            this.layers[i].activate();
            this.pixiScene.addChild(this.layers[i].getLayer());
          }

          this.running = true;
        }

        this.setInitialPosition(lastInteraction);
      },
      deactivate: function() {
        var i = 0,
          len = this.layers.length;

        if (this.running === true) {

          for (i; i < len; i += 1) {
            this.layers[i].events.off("sceneNotification", this.onLayerEvent, this);
            this.layers[i].deactivate();
            this.pixiScene.removeChild(this.layers[i].getLayer());
          }

          this.running = false;
        }

        return this.lastInteraction;
      },
      reset: function() {
        if (this.running === true) {
          this.deactivate();
        }
        this.activate();
      },
      getScene: function() {
        return this.pixiScene;
      },
      getRunning: function() {
        return this.running;
      },
      onLayerEvent: function(options) {
        this.events.trigger("sceneLayerEvent", options);
      },
      setInitialPosition: function(coordinates) {
        var initial = this.lastInteraction;
        if (_.isUndefined(coordinates) === false) {
          this.lastInteraction = coordinates;
          initial = coordinates;
        }

        _.each(this.layers, function(layer) {
          if (layer.listeners.interactionInitial === true) {
            layer.onInitial(initial);
          }
        });
      },
      onClick: function(coordinates) {
        this.lastInteraction = coordinates;
        _.each(this.layers, function(layer) {
          if (layer.listeners.interactionClick === true) {
            layer.onClick(coordinates);
          }
        });
      },
      onMove: function(coordinates) {
        this.lastInteraction = coordinates;
        _.each(this.layers, function(layer) {
          if (layer.listeners.interactionMove === true) {
            layer.onMove(coordinates);
          }
        });
      },
      onHandFrame: function(coordinates) {
        this.lastInteraction = coordinates;
        _.each(this.layers, function(layer) {
          if (layer.listeners.leap === true) {
            layer.onHandFrame(coordinates);
          }
        });
      }
    };

    return Scene;
  }
);