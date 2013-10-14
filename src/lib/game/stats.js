define(["log", "classes/StatsCollection", "classes/StatModel", "underscore",
    "csv", "saveAs"
  ],
  function(log, StatsCollection, StatModel, _,
    csv, saveAs) {

    var statsCollection = new StatsCollection(),
      current;

    // fetch previous stats from LocalStorage
    statsCollection.fetch();

    // returns an instance of a new StatModel in the Collection

    function getNew() {
      current = new StatModel();
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
      statsCollection.fetch();
    }

    function toJSON() {
      return statsCollection.toJSON();
    }

    function toCSV() {
      return csv(JSON.stringify(statsCollection), ";", true);
    }

    function debug() {
      return JSON.stringify(statsCollection);
    }

    function getCollection() {
      return statsCollection;
    }

    function downloadCSV() {
      // try {
      //   var isFileSaverSupported = !! new Blob();
      // } catch (e) {
      //   console.log("FileSaver is not Supported!");
      // }

      var text = toCSV();
      var blob = new Blob([text], {
        type: "text/plain;charset=utf-8"
      });
      saveAs(blob, "stats.csv");
      
      //console.log(saveAs);
    }

    return {
      getCollection: getCollection,
      getNew: getNew,
      getCurrent: getCurrent,
      saveCurrent: saveCurrent,
      clearLocalStorage: clearLocalStorage,
      toJSON: toJSON,
      toCSV: toCSV,
      debug: debug,
      downloadCSV: downloadCSV
    };
  }
);