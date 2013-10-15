define(["log", "classes/StatsCollection", "classes/StatModel", "underscore",
    "csv", "saveAs", "gameConfig"
  ],
  function(log, StatsCollection, StatModel, _,
    csv, saveAs, gameConfig) {

    var statsCollection = new StatsCollection(),
      current;

    // fetch previous stats from LocalStorage
    statsCollection.fetch();

    // returns an instance of a new StatModel in the Collection

    function getNew() {
      current = new StatModel({
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
        current.save();
      }
    }

    function clearLocalStorage() {
      localStorage.clear("StatsCollection");
      current = undefined;
      statsCollection.fetch();
    }

    function toCSV() {
      return csv(JSON.stringify(statsCollection), ";", true);
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
      }), "stats.csv");
    }

    function downloadJSON() {
      saveAs(new Blob([toJSONStrings()], {
        type: "text/plain;charset=utf-8"
      }), "stats.json");
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
      if(_.isUndefined(model) === false) {

        if(model === current) {
          current = undefined;
        }

        model.destroy();
      }
    }

    function applyPreviousSettings(id) {
      var model = statsCollection.get(id);
      if(_.isUndefined(model) === false) {
        gameConfig.resetToJSON(model.get("gameConfig"));

        // ATTENTION, dynamic require!
        require(["base/sceneManager"], function (sceneManager) {
          sceneManager.resetCurrentScene();
        });
      }
    }

    function getFormattedJSON() {
      var collectionJSON = statsCollection.toJSON();

      var i = 0,
        len = collectionJSON.length;
      for (i; i < len; i += 1) {
        collectionJSON[i].gameConfig = gameConfig.generateKeyValuePairs(undefined, collectionJSON[i].gameConfig);
      }

      //console.log(collectionJSON);

      return collectionJSON;

      //
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