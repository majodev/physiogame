define(["classes/Layer", "classes/Button", "i18n"],
  function(Layer, Button, i18n) {

    var layer = new Layer(),
      goBackButton;

    layer.onActivate = function() {

      goBackButton = new Button({
        texts: {
          normal: i18n.t("back"),
          mouseover: i18n.t("back") + "!",
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