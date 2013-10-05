define([],
  function() {
    function update(layer, gameObject, opt) {
      if (gameObject.hitted === true) {
        if (gameObject.scale.x < opt.objectHittedScaleCap) {
          gameObject.scale.x += opt.objectHittedScaleBeforeCap;
          gameObject.scale.y += opt.objectHittedScaleBeforeCap;
        } else {
          gameObject.scale.x += opt.objectHittedScaleAfterCap;
          gameObject.scale.y += opt.objectHittedScaleAfterCap;
        }
      } else {
        if (gameObject.scale.x > opt.objectNormalScaleMin) {
          if (gameObject.scale.x > opt.objectNormalScaleCap) {
            gameObject.scale.x -= opt.objectNormalScaleBeforeCap;
            gameObject.scale.y -= opt.objectNormalScaleBeforeCap;
          } else {
            gameObject.scale.x -= opt.objectNormalScaleAfterCap;
            gameObject.scale.y -= opt.objectNormalScaleAfterCap;
          }
        }
      }
    }

    return {
      update: update
    };
  }
);