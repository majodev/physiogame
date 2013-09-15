define([],
  function() {
    return {
      // DOC
      position: {
        x: 0,
        y: 0
      },
      scale: {
        x: 1,
        y: 1
      },
      visible: true,
      alpha: 1,
      rotation: 0,
      // Sprite
      texture: undefined,
      anchor: {
        x: 0.5,
        y: 0.5
      },
      // Text
      text: "notext",
      style: {
        font: "bold italic 40px Arvo",
        fill: "#bb4433",
        align: "center",
        stroke: "#FFAAAA",
        strokeThickness: 5,
        wordWrap: false,
        wordWrapWidth: 100
      }
    };
  }
);