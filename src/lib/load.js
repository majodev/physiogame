define(["loaders/preloader"],
  function(preloader) {
    
    (function preloading() {
      preloader.events.on("preloadedAll", preloadingFinished);
      preloader.init();
    }());

    function preloadingFinished() {
      // dynamic require! - dont forget include within build options
      // THIS IS NOT SEEN BY THE R.JS OPTIMIZER, custom include needed!
      // I want preloading to finish before executing ANY other scripts!
      require(["gameController"], function (gameController) {
        gameController.init();
      });
    }
  }
);