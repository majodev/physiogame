define(["layers/crosshair", "layers/aliens", "display/factory", "display/assets"],
  function(crosshair, aliens, factory, assets) {
    var scene = factory.makeScene(),
      crosshairLayer = crosshair.getLayer(),
      alienLayer = aliens.getLayer(),
      running = false;

    function activate() {
      if (!running) {
        aliens.activate();
        crosshair.activate();
        scene.addChild(alienLayer);
        scene.addChild(crosshairLayer);

        running = true;
      }
    }

    function deactivate() {
      if(running) {
        aliens.deactivate();
        crosshair.deactivate();
        scene.addChild(alienLayer);
        scene.addChild(crosshairLayer);

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