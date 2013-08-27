define(["jquery", "config", "underscore"],
  function($, config, _) {

    var running = false,
      initialWidth = config.get("width"),
      initialHeight = config.get("height"),
      currentWidth = initialWidth,
      currentHeight = initialHeight,
      watcherWidth = 0,
      watcherHeight = 0,
      nodeToWatch,
      nodeToResize;

    function init(targetToWatch, targetToResize) {

      if(targetToWatch !== window || _.isElement(targetToWatch)) {
        throw new TypeError("targetToWatch is not a valid DOM or global window object");
      }

      if (!_.isObject(targetToResize)) {
        throw new TypeError("targetToResize is not a valid object");
      }

      if(!_.isFunction(targetToResize.resize)) {
        throw new TypeError("targetToResize has no resize(width, height) function to call");
      }

      if (running === false) {

        console.log("resizeWatcher: init");

        // set nodes that should be watched and manipulated
        nodeToResize = targetToResize;
        nodeToWatch = targetToWatch;

        // set up listeners
        $(nodeToWatch).resize(onResize);
        nodeToWatch.onorientationchange = onResize;

        // set up initial values for watcher
        watcherWidth = $(nodeToWatch).width();
        watcherHeight = $(nodeToWatch).height();

        running = true;
      }
    }

    function kill() {
      if (running === true) {
        // TODO: remove onResize listeners here!
        // 
        running = false;
      }
    }

    function resizeTo(width, height) {
      if (running === true) {
        currentWidth = width;
        currentHeight = height;

        config.set("width", width);
        config.set("height", height);

        nodeToResize.resize(currentWidth, currentHeight);

        console.log("resizeTo: " + currentWidth + "x" + currentHeight);
      }
    }

    function resizeNow() {
      if(running === true) {
        watcherWidth = $(nodeToWatch).width();
        watcherHeight = $(nodeToWatch).height();
        resizeTo(watcherWidth, watcherHeight);
      }
    }

    function onResize() {
      
      resizeNow();
      

      //console.log("resize!");

      /* 

      var ratio = height / 640;

      //  console.log(width + " : " + height + " ratio:" + ratio)
      //ratio = Math.min(ratioX, ratioY);
      //offsetX = width/2 - (600 * ratio)/2;
      //offsetY = height/2 - (800 * ratio)/2;



      if (game) {
        var view = game.view.renderer.view;
        //view.style.width = 600 * ratio +"px"
        view.style.height = 640 * ratio + "px";


        //holder.style.left = width/2 - (600 * ratio)/2 + "px";//(width / 2) - (600 * ratio) + "px"; 
        //holder.style.top =  height/2 - (800 * ratio)/2 + "px";
        var newWidth = (width / ratio);

        view.style.width = width + "px";

        this.logo.position.x = newWidth / 2;
        this.logo.position.y = 640 / 2 - 20;

        if (black) {
          black.scale.x = newWidth / 16;
          black.scale.y = 640 / 16;
        }

        this.countdown.position.x = newWidth / 2;
        this.countdown.position.y = 640 / 2;

        console.log(newWidth);

        game.view.resize(newWidth, 640);

        pixiLogo.position.x = newWidth - 118;
        pixiLogo.position.y = 640 - 60 - 10;
      }

      GAME.width = (width / ratio);
      GAME.height = 640;
      loaderView.style.left = width / 2 - 256 / 2 + "px";
      loaderView.style.top = height / 2 - 82 / 2 + "px";
      //renderer.resize(width, height);
  */
    }

    return {
      init: init,
      kill: kill,
      resizeNow: resizeNow
    };
  }


);