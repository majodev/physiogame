define([],
  function() {
    return {
      flags: { // renderer is allowed to update these!
        dirty: { // indicator for refresh of renderersystem
          text: true, // tell renderer to update text
          style: true // test renderer to update style
        }
      },
      text: undefined,
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