define(["PIXI"],
  function(PIXI) {

    // private
    var width = 800,
      height = 600,
      renderTarget = document.body,
      background = 0x000000,
      interactive = false,
      stage = new PIXI.Stage(background, interactive),
      renderer = PIXI.autoDetectRenderer(width, height),
      frameCount = 0,
      animations = [],
      animationsLength = 0;

    var render = function render() {
      var i = 0;
      requestAnimFrame(render);

      // call animations if any
      for (i; i < animationsLength; i += 1) {
        animations[i]();
      }

      // finally render the stage
      renderer.render(stage);
      frameCount += 1;
    };

    var addAnimation = function addAnimation(func) {
      if (typeof func === "function") {
        animationsLength += 1;
        animations.push(func);
      } else {
        console.log("addAnimation: no valid function in parameter!");
      }
    };

    var removeAnimation = function removeAnimation(func) {
      var i = 0;

      if (typeof func === "function") {
        // search for animation...
        for (i; i < animationsLength; i += 1) {
          if(animations[i] === func) {
            
            // delete it.
            animations.splice(i, 1);
            animationsLength -= 1;
            

            return true;
          }
        }
      } else {
        console.log("removeAnimation: no valid function in parameter!");
      }

      return false;
    };

    (function init() {
      console.log("init");
      renderTarget.appendChild(renderer.view);
      requestAnimFrame(render);
    }());

    // per interval ms
    setInterval(function() {
      var time = frameCount / 2;
      console.log("display: received " + frameCount + " frames @ " + time + "fps.");
      frameCount = 0;
    }, 2000);

    // public
    return {
      stage: stage,
      renderer: renderer,
      registerAnimation: function registerAnimation(func) {
        addAnimation(func);
      },
      unregisterAnimation: function unregisterAnimation(func) {
        removeAnimation(func);
      }
    };
  }
);