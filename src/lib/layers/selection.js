define(["classes/Layer", "classes/Button"],
  function(Layer, Button, sceneManager) {

    var layer = new Layer(),
      testButton;

    layer.onActivate = function() {

      testButton = new Button({
        style: {
          font: "bold 40px Arvo"
        },
        texts: {
          normal: "shooting",
          mouseover: "play!",
        }
      });

      testButton.display.position = {
        x: this.width * 0.5,
        y: this.height * 0.75
      };

      testButton.onClick = function() {
        layer.notifyScene({
          pushScene: "shooting"
        });
      };

      // testButton.events.on("click", function() {
      //   layer.notifyScene({
      //     pushScene: "shooting"
      //   });
      // });

      this.addChild(testButton.display);
    };

    return layer;

  });