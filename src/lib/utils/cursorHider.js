define(["jquery"],
  function($) {
    function hideAtCanvas() {
      $("canvas").css('cursor', 'none');
    }

    function showAtCanvas() {
      $("canvas").css('cursor', '');
    }

    function hideAtBody() {
      $("body").css('cursor', 'none');
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