define([],
  function() {
    return {
      texture: {
        id: undefined,
        image: undefined
      },
      anchor: {
        x: 0.5,
        y: 0.5
      },
      width: 0,
      height: 0,
      // renderers are allowed to control 
      //if dimension or scale gets autoupdated by display
      autoDetectDimensions: true
    };
  }
);