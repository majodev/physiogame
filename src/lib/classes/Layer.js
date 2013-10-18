define(["PIXI", "underscore", "base/displayManager",
    "base/leapManager", "appConfig", "utils/publisher"
  ],
  function(PIXI, _, displayManager,
    leapManager, appConfig, publisher) {

    var Layer = function(options) {
      this.width = appConfig.get("width");
      this.height = appConfig.get("height");

      this.pixiLayer = new PIXI.DisplayObjectContainer();

      this.events = publisher.make();

      this.listeners = {};
      this.listeners.render = false;
      this.listeners.leap = false;
      this.listeners.interactionClick = false;
      this.listeners.interactionMove = false;
      this.listeners.interactionInitial = false;


      if (_.isUndefined(options) === false && _.isUndefined(options.listeners) === false) {
        if (!_.isUndefined(options.listeners.render)) {
          this.listeners.render = options.listeners.render;
        }

        if (!_.isUndefined(options.listeners.leap)) {
          this.listeners.leap = options.listeners.leap;
        }

        if (!_.isUndefined(options.listeners.interactionClick)) {
          this.listeners.interactionClick = options.listeners.interactionClick;
        }

        if (!_.isUndefined(options.listeners.interactionMove)) {
          this.listeners.interactionMove = options.listeners.interactionMove;
        }

        if (!_.isUndefined(options.listeners.interactionInitial)) {
          this.listeners.interactionInitial = options.listeners.interactionInitial;
        }
      }

    };

    Layer.prototype = {
      constructor: Layer,
      onActivate: function() {
        // OVERRIDE NEEDED
        throw new Error("onActivate must be overridden!");
      },
      onDeactivate: function() {
        // OVERRIDE OPTIONAL
      },
      activate: function() {
        // called by scene when activated

        if (this.listeners.render === true) {
          displayManager.events.on("renderFrame", this.onRender);
        }

        if (this.listeners.leap === true) {
          leapManager.events.on("handFrameNormalized", this.onHandFrame);
        }

        this.onActivate();
      },
      deactivate: function() {
        var i = 0;

        this.onDeactivate();

        if (this.listeners.render === true) {
          displayManager.events.off("renderFrame", this.onRender);
        }

        if (this.listeners.leap === true) {
          leapManager.events.off("handFrameNormalized", this.onHandFrame);
        }

        i = this.pixiLayer.children.length - 1;
        for (i; i >= 0; i -= 1) {
          this.pixiLayer.removeChild(this.pixiLayer.children[i]);
        }
      },
      reset: function () {
        this.deactivate();
        this.activate();
      },
      addChild: function(child) {
        this.pixiLayer.addChild(child);
      },
      removeChild: function(child) {
        this.pixiLayer.removeChild(child);
      },
      notifyScene: function(options) {
        this.events.trigger("sceneNotification", options);
      },
      getLayer: function() {
        return this.pixiLayer;
      },
      onRender: function() {
        throw new Error("onRender has to be overridden when listeners.render === true");
      },
      onHandFrame: function(coordinates) {
        throw new Error("onHandFrame has to be overridden when listeners.leap === true");
      },
      onClick: function(coordinates) {
        throw new Error("onClick has to be overridden when listeners.interactionClick === true");
      },
      onMove: function(coordinates) {
        throw new Error("onMove has to be overridden when listeners.interactionMove === true");
      },
      onInitial: function(coordinates) {
        throw new Error("onInitial has to be overridden when listeners.interactionInitial === true");
      }
    };

    return Layer;
  }
);