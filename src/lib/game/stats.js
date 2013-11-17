define(["log", "classes/StatsCollection", "classes/StatModel", "underscore",
    "csv", "saveAs", "gameConfig", "moment", "views/alertModal"
  ],
  function(log, StatsCollection, StatModel, _,
    csv, saveAs, gameConfig, moment, alertModal) {

    var statsCollection = new StatsCollection(),
      current;


    (function startup() {
      log.debug("stats: startup fetch()");

      // fetch previous stats from LocalStorage
      statsCollection.fetch();

      // if length > 0 reset gameConfig to the last tracked settings...
      if (statsCollection.length > 0) {
        try {
          applyPreviousSettings(statsCollection.models[statsCollection.length - 1].id);
          log.debug("stats: startup fetch(): restored previous settings.");
          //log.debug("stats: startup applied last known gameConfig!");
          alertModal.show({
            head: "Willkommen zurück " + gameConfig.getFormattedValue("userName") + "!",
            text: "Einstellungen deines letzten Spiels wiederhergestellt.",
            autoDismiss: 4000
          });
        } catch (e) {
          log.error("stats: startup fetch(): cannot apply last known settings e=" + e);
        }
      } else {
        log.debug("stats: startup fetch(): no settings found.");
        alertModal.show({
          head: "Willkommen " + gameConfig.getFormattedValue("userName") + "!",
          text: "Schau doch mal in die Einstellungen um deinen Benutzernamen zu setzen.",
          autoDismiss: 6000
        });
      }
    }()); // self executing only at startup

    // returns an instance of a new StatModel in the Collection

    function getNew() {
      current = new StatModel({
        objectsCatched: 0,
        specialsCatched: 0,
        finished: false,
        started: false,
        locked: false,
        accuracyX: 1,
        accuracyY: 1,
        accuracySum: 1,
        points: 0,
        specialFingerUsed: [0, 0, 0, 0, 0, 0]
      });

      statsCollection.push(current);
      //log.debug("stats: getNew id=" + current.cid);
      return current;
    }

    function getCurrent() {
      if (_.isUndefined(current) === true) {
        newStat();
      }
      return current;
    }

    function saveCurrent() {
      if (_.isUndefined(current) === false) {
        if (current.get("locked") === false) {
          current.lock();
          current.save();
          alertModal.show({
            head: "Speichern...",
            text: gameConfig.getFormattedValue("userName") + ", dein Spiel wurde gespeichert!",
            autoDismiss: 1200
          });
        }
      }
    }

    function clearLocalStorage() {
      localStorage.clear("StatsCollection");
      current = undefined;
      statsCollection.fetch();
    }

    function toCSV() {
      var i = 0,
        len = statsCollection.models.length,
        convertedCollection = [];
      for (i; i < len; i += 1) {
        convertedCollection.push(statsCollection.models[i].convertToCSV());
      }

      return csv(JSON.stringify(convertedCollection), ";", true);
    }

    function toJSONStrings() {
      return JSON.stringify(statsCollection);
    }

    function getCollection() {
      return statsCollection;
    }

    function downloadCSV() {
      saveAs(new Blob([toCSV()], {
        type: "text/plain;charset=utf-8"
      }), getFileName("stats_", ".csv"));
    }

    function downloadJSON() {
      saveAs(new Blob([toJSONStrings()], {
        type: "text/plain;charset=utf-8"
      }), getFileName("stats_", ".json"));
    }

    function getFileName(pre, post) {
      return pre + moment().format("YYYY_MM_DD__HH_mm_ss") + post;
    }

    function loadFromJSON(jsonObject) {
      //clearLocalStorage(); // no we will keep the locals! :)
      statsCollection.add(jsonObject);

      _.forEach(statsCollection.models, function(model) {
        model.save();
      });
    }

    function removeByID(id) {
      var model = statsCollection.get(id);
      if (_.isUndefined(model) === false) {

        if (model === current) {
          current = undefined;
        }

        model.destroy();
      }
    }

    function applyPreviousSettings(id) {
      var model = statsCollection.get(id);
      if (_.isUndefined(model) === false) {
        gameConfig.resetToJSON(model.get("gameConfig"));

        // ATTENTION, dynamic require!
        require(["base/sceneManager"], function(sceneManager) {
          sceneManager.resetCurrentScene();
        });
      }
    }

    function getFormattedJSON() {
      var i = 0,
        len = statsCollection.models.length,
        convertedCollection = [];
      for (i; i < len; i += 1) {
        convertedCollection.push(statsCollection.models[i].convertToFormattedJSON());
      }

      return convertedCollection;
    }

    return {
      getCollection: getCollection,
      getNew: getNew,
      getCurrent: getCurrent,
      saveCurrent: saveCurrent,
      clearLocalStorage: clearLocalStorage,
      downloadCSV: downloadCSV,
      downloadJSON: downloadJSON,
      loadFromJSON: loadFromJSON,
      removeByID: removeByID,
      applyPreviousSettings: applyPreviousSettings,
      getFormattedJSON: getFormattedJSON
    };
  }
);