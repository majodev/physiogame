define([],
  function() {

    // object is wrapped in a function to be immutable.
    return {
      width: 1024,
      height: 768,
      interactive: true,
      background: 0x111111,
      renderTarget: document.body
    };
  }
);