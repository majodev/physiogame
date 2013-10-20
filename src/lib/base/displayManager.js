define(["log", "PIXI", "appConfig", "utils/resizeWatcher", "utils/publisher", "game/textures", "Poll"],
  function(log, PIXI, appConfig, resizeWatcher, publisher, textures, Poll) {

    // private
    var stage = new PIXI.Stage(appConfig.get("background"),
      appConfig.get("interactive")),
      renderer = PIXI.autoDetectRenderer(appConfig.get("width"),
        appConfig.get("height"), null, appConfig.get("transparent")),
      renderTarget = appConfig.get("renderTarget"),
      frameCount = 0,
      events = publisher.make();

    function init() {
      log.debug("displayManager: init");

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
            debugText = "Display @ " + time + " fps";
          events.trigger("debugInfo", debugText);
          frameCount = 0;
        }
      });

    }

    function renderFrame() {
      requestAnimFrame(renderFrame);

      // publish renderFrame event to subscribers
      events.trigger("renderFrame");

      // render the stage and update count for debug purposes
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