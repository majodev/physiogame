define(["log", "jquery", "appConfig", "underscore"],
  function(log, $, appConfig, _) {

    var running = false,
      initialWidth = appConfig.get("width"),
      initialHeight = appConfig.get("height"),
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

        log.debug("resizeWatcher: init");

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

        appConfig.set("width", width);
        appConfig.set("height", height);

        nodeToResize.resize(currentWidth, currentHeight);

        log.debug("resizeDirectly: " + currentWidth + "x" + currentHeight);
      }
    }

    function resizeWithScaleRatio(width, height) {

      var ratiox = appConfig.get("ratio").x,
        ratioy = appConfig.get("ratio").y,
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
          // they are both exactly what we need, no offset!
          offsetTop = 0;
          offsetLeft = 0;
        }
      }

      view.style.width = newWidth + "px";
      view.style.height = newHeight + "px";

      view.style.marginLeft = offsetLeft + "px";
      view.style.marginTop = offsetTop + "px";

      //log.debug("offsetLeft:" + offsetLeft + " offsetTop:" + offsetTop);

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