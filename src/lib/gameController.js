define(["scenes/mainScene", "displayController", "key"],
  function(mainScene, displayController, key) {

    // private
    displayController.stage.addChild(mainScene.getScene());

    key('enter', function() {
      mainScene.toggleCrosshair();
    });

    // public
    return {};
  }
);