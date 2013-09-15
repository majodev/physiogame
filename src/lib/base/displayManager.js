define(["log", "PIXI", "config", "utils/resizeWatcher", "utils/publisher", "display/textures", "Poll"],
  function(log, PIXI, config, resizeWatcher, publisher, textures, Poll) {

    // private
    var stage = new PIXI.Stage(config.get("background"),
      config.get("interactive")),
      renderer = PIXI.autoDetectRenderer(config.get("width"),
        config.get("height"), null, config.get("transparent")),
      renderTarget = config.get("renderTarget"),
      frameCount = 0,
      events = publisher.make();

    function init() {
      log.debug("display: init");

      // set style and append renderer
      renderer.view.style.position = "absolute";
      renderer.view.style.top = "0px";
      renderer.view.style.left = "0px";
      renderTarget.appendChild(renderer.view);

      // main animation function
      requestAnimFrame(renderFrame);

      // resizer
      resizeWatcher.init(window, renderer);
      resizeWatcher.resizeNow();

      events.trigger("init");

      Poll.start({
        name: "debugDisplay",
        interval: 2000,
        action: function() {
          var time = frameCount / 2,
            debugText = "display: " + frameCount + " frames @ " + time +
              "fps.";
          events.trigger("debugInfo", debugText);
          frameCount = 0;
        }
      });

    }

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