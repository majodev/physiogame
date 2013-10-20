define(["views/gameConfigModal", "views/statsModal", "key"],
  function(gameConfigModal, statsModal, key) {

    key('esc', function() {
      toggleConfig();
    });

    key('s', function() {
      toggleStats();
    });

    function toggleConfig() {
      if (statsModal.getShowing() === true) {
        statsModal.hide();
      }

      if (gameConfigModal.getShowing() === false) {
        gameConfigModal.show();
      } else {
        gameConfigModal.hide();
      }
    }

    function toggleStats() {
      if (gameConfigModal.getShowing() === true) {
        gameConfigModal.hide();
      }

      if (statsModal.getShowing() === false) {
        statsModal.show();
      } else {
        statsModal.hide();
      }
    }

    return {
      toggleStats: toggleStats,
      toggleConfig: toggleConfig
    };

  }
);