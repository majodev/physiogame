define(["layers/crosshair", "layers/aliens", "display/factory", "display/assets", "layers/score"],
  function(crosshair, aliens, factory, assets, score) {
    var scene = factory.makeScene(),
      crosshairLayer = crosshair.getLayer(),
      alienLayer = aliens.getLayer(),
      scoreLayer = score.getLayer(),
      running = false;

    function activate() {
      if (!running) {
        aliens.activate();
        crosshair.activate();
        score.activate();
        
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
        
        scene.removeChild(alienLayer);
        scene.removeChild(crosshairLayer);
        scene.removeChild(scoreLayer);

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