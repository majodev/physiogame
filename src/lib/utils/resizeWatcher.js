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

      if (targetToWatch !== window || _.isElement(targetToWatch)) {
        throw new TypeError("targetToWatch is not a valid DOM or global window object");
      }

      if (!_.isObject(targetToResize)) {
        throw new TypeError("targetToResize is not a valid object");
      }

      if (!_.isFunction(targetToResize.resize)) {
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

    function resizeDirectly(width, height) {
      if (running === true) {
        currentWidth = width;
        currentHeight = height;

        config.set("width", width);
        config.set("height", height);

        nodeToResize.resize(currentWidth, currentHeight);

        console.log("resizeDirectly: " + currentWidth + "x" + currentHeight);
      }
    }

    function resizeWithScaleRatio(width, height) {

      var ratiox = config.get("ratio").x,
        ratioy = config.get("ratio").y,
        view = nodeToResize.view,
        newHeight = (width / ratiox) * ratioy,
        newWidth = (height / ratioy) * ratiox,
        offsetTop = 0,
        offsetLeft = 0;

      if (newHeight > height) {
        // newHeight must be resetted to the newWidth ratio, as its too big
        newHeight = (newWidth / ratiox) * ratioy;
        // and then get and offset that centers the view 
        offsetLeft = (width - newWidth) / 2;
      } else {
        if (newWidth > width) {
          // then newHeight was good and new width should be used with it!
          newWidth = (newHeight / ratioy) * ratiox;
          offsetTop = (height - newHeight) / 2;
        } else {
          // both new width and new height are to big for the renderer.
          throw new Error("both width and height are to big!");
        }
      }

      view.style.width = newWidth + "px";
      view.style.height = newHeight + "px";

      view.style.marginLeft = offsetLeft + "px";
      view.style.marginTop = offsetTop + "px";

      //console.log("offsetLeft:" + offsetLeft + " offsetTop:" + offsetTop);

    }

    function resizeNow() {
      if (running === true) {
        watcherWidth = $(nodeToWatch).width();
        watcherHeight = $(nodeToWatch).height();
        //resizeDirectly(watcherWidth, watcherHeight);
        resizeWithScaleRatio(watcherWidth, watcherHeight);
      }
    }

    function onResize() {
      resizeNow();
    }

    return {
      init: init,
      kill: kill,
      resizeNow: resizeNow
    };
  }


);