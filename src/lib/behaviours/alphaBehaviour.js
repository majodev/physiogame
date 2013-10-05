define([],
  function() {
    function update(layer, gameObject, opt) {
      if (gameObject.hitted === true) {
        if (gameObject.alpha < 1) {
          gameObject.alpha += opt.objectHittedAlphaStep;
        }
      } else {
        if (gameObject.alpha > opt.objectNormalAlphaMin) {
          gameObject.alpha -= opt.objectNormalAlphaStep;
        }
      }
    }

    return {
      update: update
    };
  }
);