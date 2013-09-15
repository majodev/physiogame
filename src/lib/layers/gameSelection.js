define(["classes/Layer", "classes/Button"],
  function(Layer, Button, sceneManager) {

    var layer = new Layer(),
      shootingButton;

    layer.onActivate = function() {

      shootingButton = new Button({
        texts: {
          normal: "shooting",
          mouseover: "play!",
        }
      });

      shootingButton.display.position = {
        x: this.width * 0.5,
        y: this.height * 0.75
      };

      shootingButton.onClick = function() {
        layer.notifyScene({
          pushScene: "shooting"
        });
      };

      this.addChild(shootingButton.display);
    };

    return layer;

  });