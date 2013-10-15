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
          log.debug("stats: startup applied last known gameConfig!");
          alertModal.show({
            head: "Willkommen zurück " + gameConfig.getFormattedValue("userName") + "!",
            text: "Einstellungen deines letzten Spiels wiederhergestellt.",
            autoDismiss: 4000
          });
        } catch (e) {
          log.error("stats: startup error, cannot apply last known settings e=" + e);
        }
      }
    }()); // self executing only at startup

    // returns an instance of a new StatModel in the Collection

    function getNew() {
      current = new StatModel({
        startDate: moment().toDate(),
        gameConfig: gameConfig.toJSON()
      });
      statsCollection.push(current);
      log.debug("stats: getNew id=" + current.cid);
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
        log.debug("stats: saveCurrent id=" + current.cid);
        current.set("endDate", moment().toDate());
        current.save();
      }
    }

    function clearLocalStorage() {
      localStorage.clear("StatsCollection");
      current = undefined;
      statsCollection.fetch();
    }

    function toCSV() {

      var settingsJSON = statsCollection.toJSON(),
        convertedCollection = [],
        i = 0,
        len = settingsJSON.length;

      for (i; i < len; i += 1) {
        convertedCollection.push({
          id: settingsJSON[i].id,
          config_userName_string: gameConfig.getFormattedCustomValue("userName", settingsJSON[i].gameConfig.userName),
          startDate_date: formatDate(settingsJSON[i].startDate),
          endDate_date: formatDate(settingsJSON[i].endDate),
          catched_count: settingsJSON[i].objectsCatched,
          config_gameMode_string: gameConfig.getFormattedCustomValue("gameMode", settingsJSON[i].gameConfig.gameMode),
          config_gameMaxTime_sec: gameConfig.getValueNeededInCustomJSON("gameMaxTime", settingsJSON[i].gameConfig),
          config_objectsToSpawn_count: settingsJSON[i].gameConfig.objectsToSpawn
        });
      }

      //console.log(convertedCollection);

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
      var collectionJSON = statsCollection.toJSON();

      var i = 0,
        len = collectionJSON.length;
      for (i; i < len; i += 1) {
        collectionJSON[i].userName = gameConfig.getFormattedCustomValue("userName", collectionJSON[i].gameConfig.userName);
        collectionJSON[i].startDate = formatDate(collectionJSON[i].startDate);
        collectionJSON[i].endDate = formatDate(collectionJSON[i].endDate);
        collectionJSON[i].objectsCatched = collectionJSON[i].objectsCatched;
        collectionJSON[i].gameConfig = gameConfig.generateKeyValuePairs(undefined, collectionJSON[i].gameConfig);
      }

      return collectionJSON;
    }

    function formatDate(date) {
      return moment(date).format("DD.MM.YYYY  HH:mm:ss");
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