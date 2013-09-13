define([],
  function() {
    return {
      text: undefined,
      dirty: { // special flags for renderer to reset text and styles
        text: true,
        style: true
      },
      style: {
        font: "bold 20pt Arial",
        fill: "#000000",
        align: "center",
        stroke: "#FFFFFF",
        strokeThickness: 3,
        wordWrap: false,
        wordWrapWidth: 100
      }
    };
  }
);