define([],
  function() {
    return {
      flags: {
        // renderers are allowed to control flags
        currentFrame: 0, // current frame gets automatically updated
        playing: true,
        animationSpeed: 0,
        dirty: {
          currentFrame: false,
          playing: false,
          animationSpeed: false
        }
      },
      textures: undefined,
      loop: true,
    };
  }
);