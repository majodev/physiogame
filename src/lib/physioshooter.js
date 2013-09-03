define(["loaders/preloader"],
  function(preloader) {
    
    (function preloading() {
      preloader.events.on("preloadedAll", preloadingFinished);
      preloader.init();
    }());

    function preloadingFinished() {
      // dynamic require! - dont forget to INCLUDE within build options
      // THIS IS NOT SEEN BY THE R.JS OPTIMIZER!
      // Preloading must finish before gameController gets included at all.
      require(["controllers/game"], function (game) {
        game.init();
      });
    }
  }
);