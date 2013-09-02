define(["PIXI", "config", "utils/resizeWatcher", "utils/publisher"],
  function(PIXI, config, resizeWatcher, publisher) {

    // private
    var stage = new PIXI.Stage(config.get("background"),
      config.get("interactive")),
      renderer = PIXI.autoDetectRenderer(config.get("width"),
        config.get("height")),
      renderTarget = config.get("renderTarget"),
      frameCount = 0,
      events = publisher;

    function init() {
      console.log("displayController: init");
      renderTarget.appendChild(renderer.view);
      requestAnimFrame(renderFrame);

      resizeWatcher.init(window, renderer);
      resizeWatcher.resizeNow();

      events.trigger("init");
    }

    // per interval ms
    setInterval(function() {
      var time = frameCount / 2,
        debugText = "display: received " + frameCount + " frames @ " + time +
          "fps.";
      events.trigger("debugInfo", debugText);
      frameCount = 0;
    }, 2000);

    function renderFrame() {
      requestAnimFrame(renderFrame);

      // publish renderFrame event to subscribers
      events.trigger("renderFrame");

      // finally render the stage
      renderer.render(stage);
      frameCount += 1;
    }

    function resize() {
      resizeWatcher.resizeNow();
    }

    // public
    return {
      init: init,
      stage: stage,
      events: events,
      resize: resize
    };
  }
);