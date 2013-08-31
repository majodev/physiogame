define(["layers/crosshair", "layers/aliens", "display/factory",
  "display/assets", "layers/score", "layers/background", "layers/clouds"],
  function(crosshair, aliens, factory, assets, score, background, clouds) {
    var scene = factory.makeScene(),
      crosshairLayer = crosshair.getLayer(),
      alienLayer = aliens.getLayer(),
      scoreLayer = score.getLayer(),
      running = false,
      backgroundLayer = background.getLayer(),
      cloudsLayer = clouds.getLayer();

    function activate() {
      if (!running) {
        aliens.activate();
        crosshair.activate();
        score.activate();
        clouds.activate();
        background.activate();
        
        scene.addChild(backgroundLayer);
        scene.addChild(cloudsLayer);
        scene.addChild(alienLayer);
        scene.addChild(crosshairLayer);
        scene.addChild(scoreLayer);

        running = true;
      }
    }

    function deactivate() {
      if(running) {
        aliens.deactivate();
        crosshair.deactivate();
        score.deactivate();
        clouds.deactivate();
        background.deactivate();
        
        scene.removeChild(alienLayer);
        scene.removeChild(crosshairLayer);
        scene.removeChild(scoreLayer);
        scene.removeChild(cloudsLayer);
        scene.removeChild(backgroundLayer);

        running = false;
      }
    }

    return {
      activate: activate,
      deactivate: deactivate,
      getRunning: function () {
        return running;
      },
      getScene: function() {
        return scene;
      },
      toggleCrosshair: function() {
        if (crosshair.getRunning() === true) {
          crosshair.deactivate();
        } else {
          crosshair.activate();
        }
      }
    };
  });