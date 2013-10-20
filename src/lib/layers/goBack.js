define(["classes/Layer", "classes/Button"],
  function(Layer, Button) {

    var layer = new Layer(),
      goBackButton;

    layer.onActivate = function() {

      goBackButton = new Button({
        texts: {
          normal: "zurück",
          mouseover: "zurück!",
        }
      });

      goBackButton.display.scale = {
        x: 0.5,
        y: 0.5
      };

      goBackButton.display.position = { // division through 4 as scale reset!
        x: goBackButton.buttonBG.width/4 + 10,
        y: this.height - goBackButton.buttonBG.height/4 - 10
      };

      goBackButton.onClick = function() {
        layer.notifyScene({
          pushScene: "startscreen"
        });
      };

      this.addButton(goBackButton);
    };

    return layer;

  });