define(["PIXI", "displayConfig", "utils/eventPublisher"],
  function(PIXI, displayConfig, eventPublisher) {

    // private
    var stage = new PIXI.Stage(displayConfig.background,
      displayConfig.interactive),
      renderer = PIXI.autoDetectRenderer(displayConfig.width,
        displayConfig.height),
      renderTarget = displayConfig.renderTarget,
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