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


      if (_.isUndefined(options) === false && _.isUndefined(options.listeners) === false) {
        if (!_.isUndefined(options.listeners.render)) {
          this.listeners.render = options.listeners.render;
        }

        if (!_.isUndefined(options.listeners.leap)) {
          this.listeners.leap = options.listeners.leap;
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
        throw new Error("onHandFrame has to be overridden when listeners.render === true");
      }
    };

    return Layer;
  }
);