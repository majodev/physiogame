define([],
  function() {
    
    function init (container) {
      container.rotation = Math.random() * Math.PI;
    }

    function update (container) {
      container.rotation += 0.1;
    }

    function kill (container) {

    }
  }
);