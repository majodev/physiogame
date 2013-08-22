define(["PIXI", "config", "utils/eventPublisher"],
  function(PIXI, config, eventPublisher) {

    // private
    var stage = new PIXI.Stage(config.background,
      config.interactive),
      renderer = PIXI.autoDetectRenderer(config.width,
        config.height),
      renderTarget = config.renderTarget,
      frameCount = 0,
      events = eventPublisher(["renderFrame", "debugInfo"]);

    (function init() {
      console.log("display: init");
      renderTarget.appendChild(renderer.view);
      requestAnimFrame(renderFrame);
    }());

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
      stage: stage,
      events: events
    };
  }
);