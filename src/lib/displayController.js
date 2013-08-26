define(["PIXI", "config", "utils/eventPublisher"],
  function(PIXI, config, eventPublisher) {

    // private
    var stage = new PIXI.Stage(config.get("background"),
      config.get("interactive")),
      renderer = PIXI.autoDetectRenderer(config.get("width"),
        config.get("height")),
      renderTarget = config.get("renderTarget"),
      frameCount = 0,
      events = eventPublisher(["init", "renderFrame", "debugInfo"]);

    function init() {
      console.log("displayController: init");
      renderTarget.appendChild(renderer.view);
      requestAnimFrame(renderFrame);

      events.fire("init");
    }

    // per interval ms
    setInterval(function() {
      var time = frameCount / 2,
        debugText = "display: received " + frameCount + " frames @ " + time +
          "fps.";
      events.fire("debugInfo", debugText);
      frameCount = 0;
    }, 2000);

    function renderFrame() {
      requestAnimFrame(renderFrame);

      // publish renderFrame event to subscribers
      events.fire("renderFrame");

      // finally render the stage
      renderer.render(stage);
      frameCount += 1;
    }

    // public
    return {
      init: init,
      stage: stage,
      events: events
    };
  }
);