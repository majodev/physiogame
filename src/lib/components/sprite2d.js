define([],
  function() {
    return {
      flags: {
        // renderers are allowed to control flags
        // if dimension or scale gets autoupdated by renderer
        autoDetectDimensions: true
      },
      texture: {
        id: undefined,
        image: undefined
      },
      anchor: {
        x: 0.5,
        y: 0.5
      },
      width: -1,
      height: -1,
      
    };
  }
);