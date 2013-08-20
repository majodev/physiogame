define([],
  function() {

    // object is wrapped in a function to be immutable.
    return {
      width: 800,
      height: 600,
      interactive: true,
      background: 0x000000,
      renderTarget: document.body
    };
  }
);