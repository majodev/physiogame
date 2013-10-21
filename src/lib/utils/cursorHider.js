define(["jquery", "gameConfig"],
  function($, gameConfig) {

    var hideCursorActivated;

    (function startup() {
      hideCursorActivated = gameConfig.get("hideMouseCursor");
    }());

    gameConfig.on("change", function(model, options) {
      hideCursorActivated = gameConfig.get("hideMouseCursor");
      if(hideCursorActivated === false) {
        showAtCanvas();
        showAtBody();
      }
    });


    function hideAtCanvas() {
      if(hideCursorActivated === true) {
        $("canvas").css('cursor', 'none');
      }
    }

    function showAtCanvas() {
        $("canvas").css('cursor', '');
      
    }

    function hideAtBody() {
      if(hideCursorActivated === true) {
        $("body").css('cursor', 'none');
      }
    }

    function showAtBody() {
        $("body").css('cursor', '');
    }

    return {
      hideAtCanvas: hideAtCanvas,
      showAtCanvas: showAtCanvas,
      hideAtBody: hideAtBody,
      showAtBody: showAtBody
    };
  }
);