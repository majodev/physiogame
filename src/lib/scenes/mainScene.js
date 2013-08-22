define(["layers/crosshair", "layers/aliens", "display/factory", "display/assets"],
  function(crosshair, aliens, factory, assets) {
    var scene = factory.makeScene(),
      crosshairLayer = crosshair.getLayer(),
      alienLayer = aliens.getLayer();

    aliens.activate();
    crosshair.activate();

    scene.addChild(alienLayer);
    scene.addChild(crosshairLayer);

    return {
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